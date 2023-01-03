import {AfterViewInit, Component, OnInit} from '@angular/core';
import UIkit from 'uikit';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageUserApiService} from '../../../services/manage-user-api.service';
import {errorsToHtml} from '../../../../app/utils/form-utils';
import UIkitModalElement = UIkit.UIkitModalElement;
import {InviteMasterResponse} from '../../../models/user.model';

@Component({
    selector: 'mg-invite-master-modal',
    templateUrl: './invite-master-modal.component.html',
    styleUrls: ['./invite-master-modal.component.scss'],
    providers: [
        ManageUserApiService
    ]
})
export class InviteMasterModalComponent implements OnInit, AfterViewInit {

    readonly id: string = 'invite-master-modal';
    form: FormGroup;
    modal: UIkitModalElement;
    submitted = false;
    errorHtml: string = null;
    readonly successModalId: string = 'invite-master-success-modal';
    successModal: UIkitModalElement;
    invite: InviteMasterResponse;

    constructor(
        private readonly fb: FormBuilder,
        private readonly userApiService: ManageUserApiService
    ) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    open() {
        this.buildForm();
        this.modal.show();
    }

    ngAfterViewInit(): void {
        this.modal = UIkit.modal('#' + this.id);
        this.successModal = UIkit.modal('#' + this.successModalId);
    }

    close() {
        this.modal.hide();
    }

    private buildForm() {
        this.submitted = false;
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            sendEmail: [false]
        });
    }

    hasError(name: string, required: string) {
        return this.submitted && this.form.controls[name].hasError(required);
    }

    submit() {
        this.submitted = true;

        if (this.form.invalid)
            return;

        this.userApiService.invite(this.form.value)
            .subscribe(response => {
                if (response.isSuccess) {
                    this.invite = response;
                    this.close();
                    this.successModal.show();
                } else {
                    this.errorHtml = errorsToHtml(response.errors);
                }
            });
    }
}
