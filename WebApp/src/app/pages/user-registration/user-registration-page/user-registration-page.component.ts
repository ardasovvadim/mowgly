import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {RegistrationModel, UserInviteDto, UserValidationResponse} from '../../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {errorsToHtml} from '../../../utils/form-utils';

@Component({
  selector: 'mg-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.scss']
})
export class UserRegistrationPageComponent implements OnInit {

  form: FormGroup;

  submitted = true;
  errorHtml: string = null;
  invite: UserInviteDto;

  constructor(
      private readonly fb: FormBuilder,
      private readonly authService: AuthenticationService,
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.invite = data.invite;
      this.buildForm();
    });

    this.buildForm();
  }

  register() {
    this.submitted = true;
    this.errorHtml = null;

    if (this.form.invalid)
      return

    const obs = this.invite
        ? this.authService.registerWithInvite(this.invite.id, this.form.value as RegistrationModel)
        : this.authService.register(this.form.value as RegistrationModel);

    obs.subscribe(response => this.processRegisterResponse(response));
  }

  hasError(name: string, error: string) {
    return this.submitted && this.form.controls[name].hasError(error)
  }

  processRegisterResponse(response: UserValidationResponse) {
    if (response.isSuccess) {
      this.router.navigate(['/login']);
    } else {
      this.errorHtml = errorsToHtml(response.errors);
    }
  }

  onGoogleSignup(response: any) {
    this.errorHtml = null;

    this.authService.signupWithGoogle(response)
        .subscribe(resp => this.processRegisterResponse(resp));
  }

  private buildForm() {
    this.submitted = false;

    let firstName = '';
    let lastName = '';
    let middleName = '';

    if (this.invite) {
      const nameParts = this.invite.name.split(' ');
      if (nameParts.length > 0)
        firstName = nameParts[0];
      if (nameParts.length > 1)
        lastName = nameParts[1];
      if (nameParts.length > 2)
        middleName = nameParts[2];
    }

    this.form = this.fb.group({
      firstName: [lastName, [Validators.required]],
      lastName: [firstName, [Validators.required]],
      middleName: [middleName],
      email: [this.invite?.email ?? '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

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
}
