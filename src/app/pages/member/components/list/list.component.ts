import { Component, NgZone, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../../_models';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../../../../db/services/database.service';
import { AlertService, AlertType } from '../../../../_helpers/alert/';
import { RxDonumDatabase } from 'app/db/RxDB';

@Component({
  selector: 'list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']

})
export class ListComponent {
  members: Member[] | Member;
  membersData: Member[] | Member;
  searchBy: string = '';
  db: RxDonumDatabase;
  sub;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private zone: NgZone,
    private databaseService: DatabaseService,
    private alert: AlertService,
  ) {
    this._show();
  }

  private async _show() {
    this.db = await this.databaseService.get();
    const members$ = this.db.member.find().$;
    this.sub = members$.subscribe(members => {
      this.membersData = members;
      if (this.route.snapshot.queryParams['memberName']) {
        this.searchBy = JSON.parse(this.route.snapshot.queryParams['memberName']);
        this.searchMembers()
      } else {
        this.members = members;
      }
      this.sub.unsubscribe();
      this.zone.run(() => { });
    });
  }

  searchMembers() {
    if (Array.isArray(this.membersData)) {
      this.members = this.membersData.filter(function (el) {
        return el.firstName.concat(' ' + el.lastName).toLowerCase().indexOf(this.searchBy.toLowerCase()) > -1;
      }.bind(this));
    }
  }

  removeMember(id: string) {
    let sub = this.alert.showAlert('Are you sure you want to delete this memeber?', AlertType.Warrning, true).subscribe(
      (resp) => {
        if (resp) {
          let query = this.db.member.findOne().where("_rev").eq(id);
          query.remove();
          sub.unsubscribe();
        }
      }
    );
  }

  editMember(id: string) {
    this.router.navigate(['/pages/member/new'], { queryParams: { memberId: JSON.stringify(id) } });
  }

  donation(id: string) {
    this.router.navigate(['/pages/finance/donation'], { queryParams: { memberId: JSON.stringify(id) } });
  }
}
