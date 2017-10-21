import { Component } from '@angular/core';
import { AuthGuard } from '../../_guards/index';
import { AuthenticationService } from 'app/_services';

@Component({
  selector: 'logout',
  templateUrl: './logout.html',
  styleUrls: ['../login/login.scss']
})
export class Logout {

  constructor(private auth: AuthenticationService) {
    this.logout();
  }

  public logout(): void {
    this.auth.logout();
  }
}
