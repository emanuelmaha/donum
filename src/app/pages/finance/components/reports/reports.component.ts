import { Component, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../../../_models';
import { CompleterService, CompleterData } from 'ng2-completer';
import * as jsPDF from 'jspdf'
import { RxDonumDatabase } from 'app/db/RxDB';
import { DatabaseService } from '../../../../db/services/database.service';
import { PdfWriter } from './pdfWriter';
import { Donation } from '../../../../_models/'

@Component({
  selector: 'reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']

})
export class ReportsComponent implements OnDestroy {

  dataService: CompleterData;
  loading: boolean;
  members: any = [];
  db: RxDonumDatabase;
  donations: Donation[] = [];
  sub: any;
  dateStartMemb: Date = new Date("01/01/2017");
  dateEndMemb: Date = new Date("12/30/2017");

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
    this.report('all');
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
          if (type == 'All') {
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

  }

  private buildReportAll(): void {
    let donationsAll = Donation.GroupDonationByMemberName(this.donations);
    let date = this.getTodayDate();
    var doc = new jsPDF();
    PdfWriter.writeHeader(doc);
    let lineX = PdfWriter.writeDonation(doc, donationsAll);
    PdfWriter.writeTotalAmount(doc, Donation.GetToatalDonation(this.donations), lineX)
    PdfWriter.writeFooter(doc);
    doc.save('Report_AllMember_' + date + '.pdf');
  }

  private getTodayDate(): string {
    let d = new Date();
    return d.getDate() + '/' + d.getMonth() + 1 + '/' + d.getFullYear();
  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
