import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './finance.routing';
import { Ng2CompleterModule } from "ng2-completer";

import { DonationComponent, ReportsComponent } from './components';
import { FinanceComponent } from './finance.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    NgbRatingModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    routing,
  ],
  declarations: [
    FinanceComponent,
    DonationComponent,
    ReportsComponent
  ],
})
export class FinanceModule {
}
