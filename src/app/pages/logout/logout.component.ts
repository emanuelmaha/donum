import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthGuard } from '../../_guards/index';
import { AuthenticationService } from 'app/_services';

@Component({
  selector: 'logout',
  templateUrl: './logout.html',
  styleUrls: ['../login/login.scss']
})
export class Logout implements AfterViewInit,OnDestroy{
  timeoutId:any;
  constructor(private auth: AuthenticationService) {
    this.logout();
  }

  ngAfterViewInit(): void {
    this.timeoutId = setTimeout( function()
    {
      location.reload();
    }, 5000);
  }

  public logout(): void {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId)
  }
}
