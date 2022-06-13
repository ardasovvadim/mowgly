import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {ChangePasswordRequest} from '../../../../models/user.model';
import {mgSuccessNotification} from '../../../../utils/ui-kit';
import {getErrorListHtml} from '../../../../utils/utils';

@Component({
    selector: 'mg-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    passwordForm: FormGroup = this.fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
    });
    passwordFormSubmitted: boolean = false;
    errorHtml: string = null;

    constructor(
        private readonly fb: FormBuilder,
        private readonly userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.passwordForm.get('confirmPassword').addValidators((confirmationControl: AbstractControl): ValidationErrors | null => {
            const confirmValue = confirmationControl.value;
            const passwordValue = this.passwordForm.get('newPassword').value;
            if (confirmValue === '') {
                return null;
            }
            if (confirmValue !== passwordValue) {
                return {mustMatch: true}
            }
            return null;
        });
    }

    changePassword() {
        this.passwordFormSubmitted = true;
        this.errorHtml = null;

        if (this.passwordForm.invalid)
            return;

        const request = {...this.passwordForm.value} as ChangePasswordRequest;
        this.userService.changePassword(request)
            .subscribe(response => {
                if (response.isSuccess) {
                    mgSuccessNotification('Пароль бы изменен');
                } else {
                    this.errorHtml = getErrorListHtml(response.errors);
                }
            });
    }

    hasError(form: FormGroup, submitted: boolean, control: string, error: string): boolean {
        return form.controls[control].hasError(error) && submitted
    }

}
