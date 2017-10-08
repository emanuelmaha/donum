import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member, Donation } from '../../../../_models';
import { LocalDataSource } from 'ng2-smart-table';
import { DatabaseService } from '../../../../db/services/database.service';
import { RxDonumDatabase } from 'app/db/RxDB';
import { AlertService, AlertType } from '../../../../_helpers/alert/';
import { TableSettings } from './table.settings';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'donation',
  templateUrl: './donation.html',
  styleUrls: ['./donation.scss']
})
export class DonationComponent {

  donation: any = {};
  donations: any[] = [];
  members: any = [];
  source: LocalDataSource;
  memberPlaceholder = 'Member name';
  query: string = '';
  sub: any;
  db: RxDonumDatabase;
  dateOfReceived: Date;
  settings = TableSettings.GetSettings();
  dataCompleterService: any;
  selectedMember: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alert: AlertService,
    private zone: NgZone,
    private completerService: CompleterService
  ) {
    this.dataCompleterService = this.completerService.local(this.members, 'firstName,lastName', 'firstName,lastName');
    this.getDBData();
  }

  checkFilter() {
    let memberId = JSON.parse(this.route.snapshot.queryParams['memberId']);
    if (memberId) {
      this.source.setFilter([
        {
          field: 'memberId',
          search: memberId
        }
      ], false)
    }
  }

  selectMember(member: any) {
    if (member && member.originalObject) {
      this.selectedMember = member.originalObject;
    }
  }

  private async getDBData() {
    this.db = await this.databaseService.get();

    this.db.donation.find({ sort: [{ id: 'desc' }] }).exec().then(
      donations => {
        if (Array.isArray(donations)) {
          for (let donation of donations) {
            this.donations.push(donation.toJSON());
          }
        }
        this.updateTableSource();
        this.zone.run(() => { });

      });

    this.db.member.find().exec().then(members => {
      if (Array.isArray(members)) {
        members.forEach((m) => {
          this.members.push(m.toJSON())
        })
        this.zone.run(() => { });
      }
    });

    this.donation = this.db.donation.newDocument({});
  }

  updateTableSource() {
    if (!this.source) {
      this.source = new LocalDataSource(this.donations);
      this.checkFilter();      
    }
    this.source.setSort([{ field: 'id', direction: 'desc' }])
  }

  delete(event): void {
    let sub = this.alert.showAlert('Are you sure you want to delete this user?', AlertType.Warrning, true).subscribe(
      (resp) => {
        if (resp) {
          let query = this.db.donation.findOne().where("_rev").eq(event.data._rev);
          query.remove();
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
        sub.unsubscribe();
      }
    )
  }

  add(event): void {
    if (!this.selectedMember) {
      this.alert.showAlert('Selected member is not in our system please add the member in section Members/New', AlertType.Error);
      return;
    }

    let d = new Date(this.dateOfReceived);
    if (!this.dateOfReceived) {
      d = new Date();
    }

    let dateOfReceived = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
    this.donation.dateOfReceived = dateOfReceived
    this.donation.id = this.donations.length + 1;
    this.donation.memberId = this.selectedMember._id;
    this.donation.createdDate = d.getTime();
    this.donation.sum = Number(this.donation.sum) == null ? 0 : Number(this.donation.sum);

    this.donation.save().then(
      (success) => {
        this.donations.push(this.donation);
        this.updateTableSource()
        this.donation = this.db.donation.newDocument({});
        this.selectedMember = null;
        this.zone.run(() => { });
      },
      (error) => {
        this.showError("Please verify the input fields. There is an error on your request!");
      }
    );
  }

  async edit(event) {
    let query = this.db.donation.findOne().where("_rev").eq(event.data._rev);
    await query.update(event.newData);
    event.confirm.resolve();
  }

  showError(arg: any): any {
    this.alert.showAlert(arg, AlertType.Error);
  }
}
