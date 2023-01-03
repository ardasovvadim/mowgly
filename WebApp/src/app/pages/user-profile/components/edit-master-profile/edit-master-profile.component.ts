import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MasterEditModel} from '../../../../../admin/models/master-edit-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileMaps} from '../../../../../admin/models/profile.model';
import {DataType} from '../../../../models/data-type';
import {ImageCroppModalComponent} from '../../../../mg-shared/components/image-cropp-modal/image-cropp-modal.component';
import {ActivatedRoute} from '@angular/router';
import {ManageImageApiService} from '../../../../services/manage-image-api.service';
import {applyProfileMappingToData, applyProfileMappingToForm} from '../../../../../admin/utils/settings';
import {mgConfirm} from '../../../../utils/ui-kit';
import {isGuid, toNormalDate} from '../../../../utils/utils';
import {formHasError} from '../../../../../admin/utils/forms';

@Component({
  selector: 'mg-edit-master-profile',
  templateUrl: './edit-master-profile.component.html',
  styleUrls: ['./edit-master-profile.component.scss'],
  providers: [
    ManageImageApiService
  ]
})
export class EditMasterProfileComponent implements OnInit {

  private submitted: boolean = false;

  @Input() set master(value: MasterEditModel) {
    this.buildForm(value ?? {} as MasterEditModel);
  }

  @Input() editMode: boolean = false;
  @Input() errorHtml: string = null;

  form: FormGroup;

  tab: number = 0;
  defaultAvatar: string = '/assets/img/masters/avatars/default.webp';
  defaultProfileImage: string = '/assets/img/masters/avatars/default.webp';
  imagesToDelete: string[] = [];

  private profileMappings: ProfileMaps = {
    'avatar': {key: 'UserAvatar', type: DataType.Image, defaultValue: this.defaultAvatar},
    'profileImage': {key: 'MasterProfileImage', type: DataType.Image, defaultValue: this.defaultProfileImage},
    'description': {key: 'MasterDescriptions', type: DataType.Html},
    'instagram': {key: 'MasterInstagramLink', type: DataType.String},
    'facebook': {key: 'MasterFacebookLink', type: DataType.String},
    'images': {key: 'MasterWithImages', type: DataType.Array, defaultValue: []},
    'achievements': {key: 'CardMasterAchievements', type: DataType.Html, defaultValue: ''},
  }

  @ViewChild('cropModal') cropModal: ImageCroppModalComponent;
  @ViewChild('cropProfileImageModal') cropProfileImageModal: ImageCroppModalComponent;

  @Output() save: EventEmitter<MasterEditModel> = new EventEmitter<MasterEditModel>();

  constructor(
      private fb: FormBuilder,
      private readonly activeRoute: ActivatedRoute,
      private readonly imageApi: ManageImageApiService
  ) {
  }

  ngOnInit(): void {
  }

  submit(): MasterEditModel {
    this.submitted = true;

    if (!this.form.valid)
      return null;

    const request = this.form.value;
    applyProfileMappingToData(this.profileMappings, request);

    // todo
    if (this.imagesToDelete.length > 0)
      this.imageApi.deleteImages(this.imagesToDelete).subscribe();

    return request;
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

  private buildForm(data: MasterEditModel) {
    this.submitted = false;

    applyProfileMappingToForm(this.profileMappings, data);

    if (data.birthday)
      data.birthday = toNormalDate(data.birthday);

    this.form = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      birthday: [''],
      email: ['', [Validators.required, Validators.email]],
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

    this.form.reset(data);
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
    mgConfirm('Ви впевнені, що бажаєте видалити фото?')
        .subscribe(() => {
          if (isGuid(imageUrl)) {
            this.imagesToDelete.push(imageUrl);
          }

          const control = this.form.get('images');
          const array = control.value as any[];
          control.setValue(array.filter(v => v != imageUrl));
        })
  }

  hasError(control: string, error: string) {
    return formHasError(this.submitted, this.form, control, error);
  }
}
