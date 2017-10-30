import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './member.routing';

import { ListComponent, NewComponent } from './components';
import { MemberComponent } from './member.component';
import { AlertModule, AlertService } from '../../_helpers/alert/'
import { FilterPipe } from 'app/util/filters';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    NgbRatingModule,
    AlertModule,
    routing,
  ],
  declarations: [
    MemberComponent,
    ListComponent,
    NewComponent,
    FilterPipe
  ],
  providers: [AlertService]  
})
export class MemberModule {
}
