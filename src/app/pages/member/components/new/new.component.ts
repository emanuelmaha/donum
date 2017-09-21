import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../../_models';
import { DatabaseService } from '../../../../db/services/database.service';

@Component({
  selector: 'new',
  templateUrl: './new.html',
})
export class NewComponent implements OnInit {
  member: any;
  editMode: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  async reset() {
    const db = await this.databaseService.get();
    this.member = db.member.newDocument({});
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    if (this.route.snapshot.queryParams['memberParam']) {
      this.member = JSON.parse(this.route.snapshot.queryParams['memberParam']);
      this.editMode = true;
    } else {
      this.reset();
    }
  }

  async saveMember() {
    // TODO save member in list
    // if (this.editMode) {
    //   this.router.navigate(['/pages/member/list'], { queryParams: { memberName: JSON.stringify(this.member.firstName + ' ' + this.member.lastName) } });
    // }

    try {
      this.member.id = 1;
      await this.member.save();
      await this.reset();
    } catch (err) {
      alert('Error: Please check console');
      console.error('hero-insert.submit(): error:');
      throw err;
    }
  }
}
