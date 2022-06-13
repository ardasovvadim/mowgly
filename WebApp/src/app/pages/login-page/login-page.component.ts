import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {LoginRequest, LoginResponse} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'mg-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    form: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    })
    submitted: boolean = false;
    error: string;

    private returnUrl: string;

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthenticationService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly storage: StorageService,
    ) {
    }

    ngOnInit(): void {
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'

        if (this.authService.isAuthenticated) {
            this.router.navigate([this.returnUrl]);
        }
    }

    onLoginResponse(response: LoginResponse) {
        if (!response.isSuccess) {
            this.error = response.errorMessage;
            return;
        }

        this.router.navigateByUrl(this.returnUrl);
    }

    login() {
        this.error = null;
        this.submitted = true;

        if (this.form.invalid)
            return;

        this.authService
            .login(this.form.value as LoginRequest)
            .subscribe(response => this.onLoginResponse(response))
    }

    onGoogleSignIn(response: any) {
        this.authService.signInWithGoogle(response)
            .subscribe(data => this.onLoginResponse(data));
    }
}
