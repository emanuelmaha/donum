import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../../_models';

@Component({
  selector: 'new',
  templateUrl: './new.html',
})
export class NewComponent implements OnInit {
  member: Member;
  editMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    if (this.route.snapshot.queryParams['memberParam']) {
      this.member = JSON.parse(this.route.snapshot.queryParams['memberParam']);
      this.editMode = true;
    } else {
      this.member = new Member('', '', '', '', '', '', '', 0, []);
    }
  }

  saveMember() {
    // TODO save member in list
    if (this.editMode) {
      this.router.navigate(['/pages/member/list'], { queryParams: { memberName: JSON.stringify(this.member.firstName + ' ' + this.member.lastName) } });
    }
  }
}
