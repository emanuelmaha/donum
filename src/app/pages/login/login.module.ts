import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing } from './login.routing';

import { AlertService, AlertModule } from '../../_helpers/alert/';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Login,
  ],
  providers:[AlertService]
})
export class LoginModule {

}
