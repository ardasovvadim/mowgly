import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {RegistrationModel, UserValidationResponse} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'mg-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.scss']
})
export class UserRegistrationPageComponent implements OnInit {

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    middleName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  })

  private submitted: true;
  errorHtml: string = null;

  constructor(
      private readonly fb: FormBuilder,
      private readonly authService: AuthenticationService,
      private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.form.get('confirmPassword').addValidators((confirmationControl: AbstractControl) : ValidationErrors | null => {
      const confirmValue = confirmationControl.value;
      const passwordValue = this.form.get('password').value;
      if (confirmValue === '') {
        return null;
      }
      if (confirmValue !== passwordValue) {
        return  { mustMatch: true }
      }
      return null;
    });
  }

  register() {
    this.submitted = true;
    this.errorHtml = null;

    if (this.form.invalid)
      return

    this.authService.register(this.form.value as RegistrationModel)
        .subscribe(response => this.processRegisterResponse(response));
  }

  hasError(name: string, error: string) {
    return this.submitted && this.form.controls[name].hasError(error)
  }

  processRegisterResponse(response: UserValidationResponse) {
    if (response.isSuccess) {
      this.router.navigate(['/login']);
    } else {
      this.errorHtml = response.errors.filter((value, index, self) => {
        return self.indexOf(value) === index;
      }).map(it => `<li>${it}</li>`).join('\n');
    }
  }

  onGoogleSignup(response: any) {
    this.errorHtml = null;

    this.authService.signupWithGoogle(response)
        .subscribe(resp => this.processRegisterResponse(resp));
  }
}
