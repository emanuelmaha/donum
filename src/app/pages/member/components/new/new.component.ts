import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../../_models';
import { DatabaseService } from '../../../../db/services/database.service';
import { AlertService, AlertType } from '../../../../_helpers/alert/';
import { RxDonumDatabase } from 'app/db/RxDB';
import { Donation } from 'app/_models/donation';

@Component({
  selector: 'new',
  templateUrl: './new.html',
})
export class NewComponent {
  origMember: any;
  member: any = {};
  editMode: boolean = false;
  db: RxDonumDatabase;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alert: AlertService,
    private zone: NgZone
  ) {
    this.getDb();
  }

  async getDb() {
    await this.databaseService.get().then(
      (db) => {
        this.db = db;
        this.reset();
      }
    );
  }

  reset() {
    if (this.route.snapshot.queryParams['memberId']) {
      let memberId = JSON.parse(this.route.snapshot.queryParams['memberId']);
      this.db.member.findOne({ _id: { $eq: memberId } }).exec().then(
        (member: Member) => {
          this.member = member;
          this.origMember = JSON.parse(JSON.stringify(member));
        }
      );
      this.editMode = true;
    } else {
      this.member = this.db.member.newDocument({});
    }
    this.zone.run(() => { });
  }

  saveMember() {
    this.member.id = 1;
    this.updateDonations();
    this.member.save().then(
      (succces) => {
        if (this.editMode) {
          this.router.navigate(['/pages/member/list'], { queryParams: { memberName: JSON.stringify(this.member.firstName + ' ' + this.member.lastName) } });
        }
        this.reset();
      },
      (error) => {
        this.alert.showAlert('An error occure trying to save the member, please check the fileds and try again: ' + error, AlertType.Error);
      }
    );
  }

  private updateDonations() {
      if(this.origMember) {
        if(this.origMember.firstName !== this.member.firstName || this.origMember.lastName !== this.member.lastName){
            this.db.donation.find({"memberId":{"$eq":this.member._id}}).exec().then(
              (donations: Donation[]) => {
                donations.map((donation:Donation)=> {
                  donation.memberName = this.member.firstName + ' ' + this.member.lastName
                  donation.save();
                })
              }
            )
        }
      }
  }
}
