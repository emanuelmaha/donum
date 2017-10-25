import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { AuthenticationService } from 'app/_services';
import { AlertService, AlertType } from 'app/_helpers/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public username: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;

  constructor(fb: FormBuilder,
    private auth: AuthenticationService,
    private alert: AlertService,
    private router: Router) {

    this.auth.logout();
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.username = this.form.controls['username'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public async onSubmit(values: Object) {
    this.submitted = true;
    if (this.form.valid) {
      await this.auth.register(this.name.value, this.username.value, this.email.value, this.password.value)
        .then((resp) => {
          this.router.navigate(['waitForApprove']);
        }).catch((error) => {
          this.alert.showAlert('An error occure trying to save the user, please check the fileds and try again: ' + error, AlertType.Error);
        });
    }
  }
}
