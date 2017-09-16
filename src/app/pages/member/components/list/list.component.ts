import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../../_models';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']

})
export class ListComponent implements OnInit {
  members: Member[];
  searchBy: string;
  sourceMembers: Member[];

  constructor(private router: Router, private route: ActivatedRoute, private modalService: NgbModal) {
    this.sourceMembers = [
      new Member('Bob', 'Hemilton', 'I', '31/12/1990',
        '2534 Portland Ave, College Station, 77845 Tx', 'member1@pks.com', '9799857845', 0, [1, 2]),
      new Member('Keseru', 'Foorna', 'J', '31/12/1991', '', '', '', 1, []),
      new Member('Emanuel', 'Mahalean', 'K', '31/12/1992', '', '', '', 2, []),
      new Member('Nacios', 'Tomy', 'L', '', '', '', '', 3, []),
      new Member('Eliad', 'Elman', 'M', '', '', '', '', 4, [])
    ];
  }

  ngOnInit() {
    this.members = this.sourceMembers;
    if (this.route.snapshot.queryParams['memberName']) {
      this.searchBy = JSON.parse(this.route.snapshot.queryParams['memberName']);
      this.searchMembers()
    }
  }

  searchMembers() {
    this.members = this.sourceMembers.filter(function (el) {
      return el.firstName.concat(' ' + el.lastName).toLowerCase().indexOf(this.searchBy.toLowerCase()) > -1;
    }.bind(this));
  }

  removeMember(content, member: Member) {
    this.modalService.open(content).result.then((result) => {
      if (result == 'Yes') {
        //remove Member
      }
    }, (reason) => { });
  }

  editMember(member: Member) {
    this.router.navigate(['/pages/member/new'], { queryParams: { memberParam: JSON.stringify(member) } });
  }

  donation(member: Member) {
    this.router.navigate(['/pages/finance/donation'], { queryParams: { memberId: JSON.stringify(member.id) } });
  }
}
