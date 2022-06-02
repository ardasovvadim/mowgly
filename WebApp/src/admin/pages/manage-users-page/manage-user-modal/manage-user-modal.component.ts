import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalBase} from '../../../../app/interfaces/modal-base';
import {ManageUserApiService} from '../../../services/manage-user-api.service';
import {of} from 'rxjs';
import {mgConfirm, mgSuccessNotification} from '../../../../app/utils/ui-kit';
import {switchMap} from 'rxjs/operators';
import {AddImageModalComponent} from '../../../components/add-image-modal/add-image-modal.component';
import {ImageCroppModalComponent} from '../../../components/image-cropp-modal/image-cropp-modal.component';
import {readImageAsDataUrl, toNormalDate} from '../../../../app/utils/utils';
import {ManageImageApiService} from '../../../services/manage-image-api.service';
import {ProfileMaps} from '../../../models/profile.model';
import {DataType} from '../../../../app/models/data-type';
import {applyProfileMappingToData, applyProfileMappingToForm} from '../../../utils/settings';
import {UserEditModel, UserType, userTypes} from '../../../models/user.model';
import UIkit from 'uikit';
import use = UIkit.use;

@Component({
  selector: 'mg-manage-user-modal',
  templateUrl: './manage-user-modal.component.html',
  styleUrls: ['./manage-user-modal.component.scss'],
  providers: [
      ManageUserApiService,
      ManageImageApiService
  ]
})
export class ManageUserModalComponent extends ModalBase {

  @Output() onSubmittedAndClosed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('addImageModal') addImageModal: AddImageModalComponent;
  @ViewChild('cropImageModal') cropImageModal: ImageCroppModalComponent;

  get isEditMode(): boolean {
    return !!this.form.value?.id;
  }

  form: FormGroup = this.fb.group({
    id: [null],
    firstName: [''],
    lastName: [''],
    middleName: [''],
    birthday: [''],
    email: ['', [Validators.required]],
    phoneNumber: [''],
    userTypes: [UserType.None],
    profiles: [[]],
    avatar: ['']
  });

  imgAvatarErr: boolean = false;

  private profileMappings: ProfileMaps = {
    'avatar': {key: 'UserAvatar', type: DataType.Image}
  }
  userTypes = userTypes;

  constructor(
    private fb: FormBuilder,
    private readonly manageUserApiService: ManageUserApiService,
    private readonly imageService: ManageImageApiService
  ) {
    super();
  }

  ngOnInit(): void {

  }

  editUser(userId: string) {
    const user$ = userId
        ? this.manageUserApiService.getById(userId)
        : of({} as UserEditModel)

    user$.subscribe(user => {
      applyProfileMappingToForm(this.profileMappings, user);
      if (user.birthday)
        user.birthday = toNormalDate(user.birthday)
      this.form.reset(user);
      this.open();
    })
  }

  submit() {
    if (this.form.invalid)
      return;

    const request = this.form.value;
    applyProfileMappingToData(this.profileMappings, request);

    this.manageUserApiService.save(request)
        .subscribe(_ => {
          this.onSubmittedAndClosed.emit();
          this.close();
          mgSuccessNotification('Пользователь был сохранен');
        });
  }

  delete() {
    const id = this.form.value.id;
    if (!id)
      return;

    mgConfirm('Удалить пользователя?')
        .pipe(
            switchMap(() => this.manageUserApiService.delete(id)),
        )
        .subscribe({
          next: () => {
            mgSuccessNotification('Пользователь удален');
            this.onSubmittedAndClosed.emit();
          },
          error: () => this.open()
        });
  }

  cancel() {
    this.close();
  }


  displayImage(id: string) {
      this.form.controls['avatar']?.setValue(id);
      this.addImageModal.close();
      this.open();
  }


  onLoaded($event: Event) {
    console.log($event)
  }

  cropImage($event: Event) {
    readImageAsDataUrl($event, dataUrl => {
      this.close();
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
      this.open();
    });
  }

  checkUserType($event: any, type: number) {
    const checked = $event.target.checked
    const control = this.form.controls['userTypes']
    const value = control.value
    if (checked) {
      control.setValue(value | type)
    } else {
      control.setValue(value & ~type)
    }
  }
}
