import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Register } from './register.component';
import { routing } from './register.routing';
import { AuthenticationService } from 'app/_services';
import { AlertService } from 'app/_helpers/alert';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Register
  ],
  providers:[AuthenticationService,AlertService]
})
export class RegisterModule { }
