import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../../_models';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../../../../db/services/database.service';
import { AlertService, AlertType } from '../../../../_helpers/alert/';
import { RxDonumDatabase } from 'app/db/RxDB';
import { RxDocument } from 'rxdb';

@Component({
  selector: 'list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']

})
export class ListComponent implements OnInit {

  members: Member[] = [];
  searchBy: string = '';
  db: RxDonumDatabase;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private alert: AlertService,
  ) { }

  async ngOnInit() {
    this.db = await this.databaseService.get();
    this.db.member.find().exec().then((members: Member[]) => {
      this.members = members;
      if (this.route.snapshot.queryParams['memberName']) {
        this.searchBy = JSON.parse(this.route.snapshot.queryParams['memberName']);
      }
    });
  }

  removeMember(id: string) {
    let sub = this.alert.showAlert('Are you sure you want to delete this memeber?', AlertType.Warrning, true).subscribe(
      (resp) => {
        if (resp) {
          let query = this.db.member.findOne().where("_id").eq(id);
          query.remove();
          this.members = this.members.filter((m: any) => m._id != id);
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
