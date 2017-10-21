import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../../db/services/database.service';
import { RxDonumDatabase } from 'app/db/RxDB';
import { AlertService, AlertType } from '../../_helpers/alert/';
import { AuthenticationService } from 'app/_services';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(
    fb: FormBuilder,
    private alert: AlertService,
    private auth: AuthenticationService) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.auth.login(this.username.value, this.password.value);
    }
  }
}
