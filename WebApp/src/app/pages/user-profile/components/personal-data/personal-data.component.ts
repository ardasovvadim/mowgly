import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileMaps} from '../../../../../admin/models/profile.model';
import {DataType} from '../../../../models/data-type';
import {applyProfileMappingToData, applyProfileMappingToForm} from '../../../../../admin/utils/settings';
import {mgSuccessNotification} from '../../../../utils/ui-kit';
import {getErrorListHtml, readImageAsDataUrl, toNormalDate} from '../../../../utils/utils';
import {UserService} from '../../../../services/user.service';
import {ManageImageApiService} from '../../../../services/manage-image-api.service';
import {ImageCroppModalComponent} from '../../../../mg-shared/components/image-cropp-modal/image-cropp-modal.component';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {EditMasterProfileComponent} from '../edit-master-profile/edit-master-profile.component';

@Component({
    selector: 'mg-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.scss'],
    providers: [
        ManageImageApiService
    ]
})
export class PersonalDataComponent implements OnInit {

    @ViewChild('masterProfileComponent') masterProfileComponent: EditMasterProfileComponent;

    form: FormGroup = this.fb.group({
        firstName: [''],
        lastName: [''],
        middleName: [''],
        birthday: [''],
        email: ['', [Validators.required]],
        phoneNumber: [''],
        profiles: [[]],
        avatar: ['']
    });
    profileFormSubmitted: boolean = true;
    imgAvatarErr: boolean;
    private profileMappings: ProfileMaps = {
        'avatar': {key: 'UserAvatar', type: DataType.Image}
    }
    errorHtml: string = null;

    @ViewChild('cropImageModal') cropImageModal: ImageCroppModalComponent;
    isMaster$: Observable<boolean> = this.userService.profile$.pipe(
        map(profile => profile?.roles?.some(r => r === 'Master') ?? false)
    );

    profile = null;

    constructor(
        private readonly userService: UserService,
        private readonly fb: FormBuilder,
        private readonly imageService: ManageImageApiService
    ) {
    }

    ngOnInit(): void {
        this.refreshProfile();
    }

    submit() {
        this.errorHtml = null;
        this.profileFormSubmitted = true;

        if (this.form.invalid)
            return;

        const request = this.form.value;
        applyProfileMappingToData(this.profileMappings, request);
    }

    private updateUserData(request) {
        this.userService.updateUserData(request)
            .subscribe(response => {
                if (response.isSuccess) {
                    mgSuccessNotification('Профіль було збережено');
                    this.userService.refreshProfile();
                    this.errorHtml = null;
                } else {
                    this.errorHtml = getErrorListHtml(response.errors)
                }
            });
    }

    cropImage($event: Event) {
        readImageAsDataUrl($event, dataUrl => {
            this.cropImageModal.imageUrl = dataUrl;
            this.cropImageModal.open();
        });
    }

    onImageCropped(imageUrl: string) {
        this.imageService.add({
            dataUrl: imageUrl,
            pathPrefix: 'avatar'
        }).subscribe(id => {
            this.form.controls['avatar']?.setValue(id);
            this.cropImageModal.close();
        });
    }

    private refreshProfile() {
        this.userService.getEditProfile()
            .subscribe(profile => {
                this.profile = profile;
                applyProfileMappingToForm(this.profileMappings, profile);
                if (profile.birthday)
                    profile.birthday = toNormalDate(profile.birthday)
                this.form.reset(profile);
            });
    }

    saveMasterProfile() {
        const request = this.masterProfileComponent.submit();

        if (!request)
            return;

        this.updateUserData(request);
    }
}
