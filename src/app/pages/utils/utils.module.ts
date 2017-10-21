import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './utils.routing';
import { AlertModule, AlertService } from '../../_helpers/alert/'
import { MigrationComponent, UserComponent } from './components';
import { UtilsComponent } from './utils.component';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    NgbRatingModule,
    NgxElectronModule,
    AlertModule,
    routing,
  ],
  declarations: [
    UtilsComponent,
    MigrationComponent,
    UserComponent
  ],
  providers: [AlertService]
})
export class UtilsModule {
}
