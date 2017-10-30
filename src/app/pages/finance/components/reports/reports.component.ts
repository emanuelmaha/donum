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
export class ReportsComponent implements OnDestroy {

  dataService: CompleterData;
  loading: boolean;
  members: any = [];
  membersView: MemberView[] = [];
  db: RxDonumDatabase;
  donations: Donation[] = [];
  sub: any;
  dateStartMemb: Date = new Date("01/01/"+ new Date().getFullYear());
  dateEndMemb: Date = new Date("12/31/"+ new Date().getFullYear());
  textNoResult = 'no member found';

  constructor(
    private zone: NgZone,
    private databaseService: DatabaseService,
    private completerService: CompleterService
  ) {
    this.dataService = completerService.local(this.members, 'firstName,lastName', 'firstName,lastName');
    this.getDb();
  }

  private async getDb() {
    this.db = await this.databaseService.get();
    let members = this.db.member.find().$
    members.subscribe(
      (resp) => {
        if (Array.isArray(resp)) {
          let membersJson = []
          resp.forEach((m) => {
            this.members.push(m.toJSON())
          })
          this.zone.run(() => { });
        }
      }
    );
  }

  selectMember(selected: any) {
    if (selected && selected.originalObject && this.membersView.filter(m => m._id == selected.originalObject._id).length == 0) {
      this.loading = true;
      let member = new MemberView()
      member.fromJson(selected.originalObject);
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

  private buildReportMember(): void {
    let today = DateUtil.getUSDateFormat();
    var doc = new jsPDF();
    let membersName = ''
    this.membersView.forEach(element => {
      membersName += element.firstName + '-' + element.lastName + '_'
    });
    PdfWriter.buildReportMembers(doc, this.dateStartMemb, this.dateEndMemb, this.membersView);

    doc.save('DonationReport_' + membersName.slice(0, -1) + '_' + today + '.pdf');
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
      memberName: {
        $eq: member.firstName + ' ' + member.lastName
      }
    }).exec().then((donation) => {
      member.donations = donation;
      this.loading = false;
    });
  }
  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
