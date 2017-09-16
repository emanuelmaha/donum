import { Component } from '@angular/core';

@Component({
  selector: 'logout',
  templateUrl: './logout.html',
  styleUrls: ['../login/login.scss']
})
export class Logout {

  constructor() {
    this.logout();
  }

  public logout(): void {
  }
}
