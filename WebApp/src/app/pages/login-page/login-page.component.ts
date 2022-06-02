import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthorizeService} from '../../../api-authorization/authorize.service';
import {switchMap} from 'rxjs/operators';
import {from} from 'rxjs';

@Component({
  selector: 'mg-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: [],
    password: []
  })

  constructor(
      private readonly fb: FormBuilder,
      private readonly authService: AuthorizeService
  ) { }

  ngOnInit(

  ): void {
  }

  login() {
    from(this.authService.ensureUserManagerInitialized())
        .pipe(
          switchMap(() => this.authService.userManager.signinRedirect())
        )
        .subscribe()
    ;

  }
}
