import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MasterEditModel} from '../../../models/master-edit-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataType} from '../../../../app/models/data-type';
import {ManageMasterApiService} from '../../../services/manage-master-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {delay, finalize, of} from 'rxjs';
import {ImageCroppModalComponent} from '../../../../app/mg-shared/components/image-cropp-modal/image-cropp-modal.component';
import {ManageImageApiService} from '../../../services/manage-image-api.service';
import {ProfileMaps} from '../../../models/profile.model';
import {goToExternalLink, isGuid, toNormalDate} from '../../../../app/utils/utils';
import {applyProfileMappingToData, applyProfileMappingToForm} from '../../../utils/settings';
import {mgConfirm, mgSuccessNotification} from '../../../../app/utils/ui-kit';

@Component({
    selector: 'mg-manage-master-page',
    templateUrl: './manage-master-page.component.html',
    styleUrls: ['./manage-master-page.component.scss'],
    providers: [
        ManageMasterApiService,
        ManageImageApiService,
    ]
})
export class ManageMasterPageComponent implements OnInit, AfterViewInit {

    master: MasterEditModel = {} as MasterEditModel;

    editMode: boolean = false;

    form: FormGroup = this.fb.group({
        id: [''],
        firstName: [''],
        lastName: [''],
        middleName: [''],
        birthday: [''],
        email: [''],
        phone: [''],
        profiles: [''],
        avatar: [''],
        profileImage: [''],
        description: [''],
        instagram: [''],
        facebook: [''],
        images: [''],
        achievements: [''],
    });
    tab: number = 0;
    defaultAvatar: string = '/assets/img/masters/avatars/default.webp';
    defaultProfileImage: string = '/assets/img/masters/avatars/default.webp';
    imagesToDelete: string[] = [];

    isSaving = false;
    isDeleting = false;


    private profileMappings: ProfileMaps = {
        'avatar': {key: 'CardMasterAvatarImage', type: DataType.Image, defaultValue: this.defaultAvatar},
        'profileImage': {key: 'MasterProfileImage', type: DataType.Image, defaultValue: this.defaultProfileImage},
        'description': {key: 'MasterDescriptions', type: DataType.Html},
        'instagram': {key: 'MasterInstagramLink', type: DataType.String},
        'facebook': {key: 'MasterFacebookLink', type: DataType.String},
        'images': {key: 'MasterWithImages', type: DataType.Array, defaultValue: []},
        'achievements': {key: 'CardMasterAchievements', type: DataType.Html, defaultValue: ''},
    }

    @ViewChild('cropModal') cropModal: ImageCroppModalComponent;
    @ViewChild('cropProfileImageModal') cropProfileImageModal: ImageCroppModalComponent;

    constructor(
        private fb: FormBuilder,
        private masterService: ManageMasterApiService,
        private readonly activeRoute: ActivatedRoute,
        private readonly imageApi: ManageImageApiService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.activeRoute.params
            .pipe(
                map(params => params['id']),
                switchMap(id => {
                    if (id == 'new')
                        return of({} as MasterEditModel)

                    return this.masterService.getEditModel(id)
                })
            )
            .subscribe(data => this.mapDateToForm(data));

        this.form.controls['id'].valueChanges.subscribe(v => this.editMode = v != null);
    }

    submit() {
        if (!this.form.valid)
            return;

        const request = this.form.value;
        applyProfileMappingToData(this.profileMappings, request);
        const isNew = !request.id

        this.isSaving = true;
        this.masterService
            .save(request)
            .pipe(
                tap(data => this.mapDateToForm(data)),
                switchMap(() => {
                    if (this.imagesToDelete.length > 0)
                        return this.imageApi.deleteImages(this.imagesToDelete);

                    return of(null);
                }),
                finalize(() => this.isSaving = false)
            )
            .subscribe(() => {
                this.imagesToDelete = [];
                mgSuccessNotification('Данные были сохранены')
                if (isNew)
                    this.router.navigateByUrl(this.router.url.replace('new', this.form.value.id))
            });
    }

    delete() {
        mgConfirm('Вы уверены что хотите удалить Інструктора?')
            .pipe(
                switchMap(() => this.masterService.delete(this.form.value.id))
            )
            .subscribe(() => {
                mgSuccessNotification('Інструктор удален')
                this.router.navigate(['../'], {relativeTo: this.activeRoute})
            })
    }

    ngAfterViewInit(): void {
    }

    cropImage($event: Event) {
        const file = ($event.target as HTMLInputElement).files[0];
        const fr = new FileReader()
        fr.onload = () => {
            this.cropModal.imageUrl = fr.result as string;
            this.cropModal.open();
        }
        fr.readAsDataURL(file);
    }

    displayImage(imageDataUrl: string) {
        this.cropModal.close()
        this.imageApi.add({
            dataUrl: imageDataUrl,
            pathPrefix: 'masters/avatars'
        })
            .subscribe(id => {
                this.form.get('avatar')?.setValue(id);
            });
    }

    private mapDateToForm(data: MasterEditModel) {
        applyProfileMappingToForm(this.profileMappings, data);
        if (data.birthday)
            data.birthday = toNormalDate(data.birthday)
        this.form.reset(data)
    }

    changeProfilePicture(imageDataUrl: string) {
        this.cropProfileImageModal.close();
        this.imageApi.add({
            dataUrl: imageDataUrl,
            pathPrefix: 'masters/profile-photos'
        })
            .subscribe(id => {
                this.form.get('profileImage')?.setValue(id);
            });
    }

    cropProfileImage($event: Event) {
        const file = ($event.target as HTMLInputElement).files[0];
        const fr = new FileReader()
        fr.onload = () => {
            this.cropProfileImageModal.imageUrl = fr.result as string;
            this.cropProfileImageModal.open();
        }
        fr.readAsDataURL(file);
    }

    deleteImage(imageUrl: string) {
        mgConfirm('Вы уверены что хотите удалить фото?')
            .subscribe(() => {
                if (isGuid(imageUrl)) {
                    this.imagesToDelete.push(imageUrl);
                }

                const control = this.form.get('images');
                const array = control.value as any[];
                control.setValue(array.filter(v => v != imageUrl));
            })
    }

    goToViewProfile() {
        goToExternalLink('/master/' + this.form.value['id']);
    }
}
