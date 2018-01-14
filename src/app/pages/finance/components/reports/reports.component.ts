import { Component, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../../../_models';
import { CompleterService, CompleterData } from 'ng2-completer';
import * as jsPDF from 'jspdf'
import { RxDonumDatabase } from 'app/db/RxDB';
import { DatabaseService } from '../../../../db/services/database.service';
import { Donation } from '../../../../_models/'
import { MemberView } from '../../../../modelView/'
import { DateUtil, PdfWriter } from '../../../../util/';

@Component({
  selector: 'reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']

})
export class ReportsComponent {

  dataService: CompleterData;
  loading: boolean;
  membersJson: any = [];
  members: Member[];
  membersView: MemberView[] = [];
  db: RxDonumDatabase;
  donations: Donation[] = [];
  sub: any;
  dateStartMemb: Date = new Date("01/01/" + (new Date().getFullYear() - 1));
  dateEndMemb: Date = new Date("12/31/" + (new Date().getFullYear() - 1) );
  textNoResult = 'no member found';

  constructor(
    private zone: NgZone,
    private databaseService: DatabaseService,
    private completerService: CompleterService
  ) {
    this.dataService = completerService.local(this.membersJson, 'firstName,lastName', 'firstName,lastName');
    this.getDb();
  }

  private async getDb() {
    this.db = await this.databaseService.get();
    let members = this.db.member.find().exec().then(
      (members: Member[]) => {
        members.forEach((m) => {
          this.membersJson.push(m.toJSON())
        })
        this.members = members;
      }
    )
  }

  selectMember(selected: any) {
    if (selected && selected.originalObject && this.membersView.filter(m => m._id == selected.originalObject._id).length == 0) {
      let member = MemberView.fromJson(selected.originalObject);
      this.getDonations(member);
      this.membersView.push(member);
    }
  }

  removeMember(member: MemberView) {
    this.membersView = this.membersView.filter(m => m._id != member._id);
  }

  report(type: string) {
    this.loading = true;
    this.db.donation.find(
      {
        createdDate: {
          $gte: this.dateStartMemb.getTime(),
          $lte: this.dateEndMemb.getTime()
        },
      }
    ).exec().then(
      donations => {
        if (Array.isArray(donations)) {
          for (let donation of donations) {
            this.donations.push(donation.toJSON());
          }
          if (type == 'all') {
            this.buildReportAll();
          } if ( type == 'allinone'){
            this.buildReportAllInOne()
          } else {
            this.buildReportMember();
          }
        }
      },
      error => {
        console.log(error);
      }
      );

    this.loading = false;
  }

  private async buildReportAllInOne(): Promise<any> {
    let today = DateUtil.getUSDateFormat();
    var doc = new jsPDF();

    for(let index in this.members){
      let memberView = MemberView.fromJson(this.members[index]);
      await this.db.donation.find({
        createdDate: {
          $gte: this.dateStartMemb.getTime(),
          $lte: this.dateEndMemb.getTime()
        },
        memberId: {
          $eq: memberView._id
        }
      }).exec().then((donation) => {
        memberView.donations = donation;
      });
      PdfWriter.buildReportMembers(doc, this.dateStartMemb, this.dateEndMemb, [memberView]);
      doc.addPage();
    }

    doc.save('DonationReport_AllInOne_' + today + '.pdf');
  }

  private buildReportMember(): void {
    let today = DateUtil.getUSDateFormat();
    var doc = new jsPDF();
    let membersName = ''
    this.membersView.forEach(element => {
      membersName += element.firstName + '-' + element.lastName + '_'
    });
    PdfWriter.buildReportMembers(doc, this.dateStartMemb, this.dateEndMemb, this.membersView);

    doc.save('DonationReport_' + membersName + today + '.pdf');
  }

  private buildReportAll(): void {
    let today = DateUtil.getUSDateFormat();
    var doc = new jsPDF();
    PdfWriter.buildReportAll(doc, this.dateStartMemb, this.dateEndMemb, this.donations);
    doc.save('DonationReport_AllMember_' + today + '.pdf');
  }

  getDonations(member: MemberView) {
    this.db.donation.find({
      createdDate: {
        $gte: this.dateStartMemb.getTime(),
        $lte: this.dateEndMemb.getTime()
      },
      memberId: {
        $eq: member._id
      }
    }).exec().then((donation) => {
      member.donations = donation;
    });
  }
}
