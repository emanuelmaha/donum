import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'wait-for-approve',
  template: `
    <div class="auth-main">
      <div class="auth-block">
        Your request was registered. Administrator has to approve your account.
      </div>
    </div>
    `,
    styleUrls: ['./wait.scss']
})
export class WaitForApprove {
}
