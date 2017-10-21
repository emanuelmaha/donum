import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { Pages } from './pages.component';
import { AuthenticationService } from 'app/_services';
import { AlertService } from 'app/_helpers/alert';
import { WaitForApprove } from 'app/pages/waitForApprove/waitForApprove.component';
import { Logout } from 'app/pages/logout/logout.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages, WaitForApprove, Logout],
  providers: [AuthenticationService, AlertService]
})
export class PagesModule {
}
