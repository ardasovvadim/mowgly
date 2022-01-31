import {Component, OnInit} from '@angular/core';
import {ModalBase} from '../../../../interfaces/modal-base';
import {MasterEditModel} from '../../../models/master-edit-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import Quill from 'quill';
import {GeneralSettingVm, parseValue, setOrCreateSetting} from '../../../../models/general-setting.view.model';
import {MasterService} from '../../../../services/master.service';
import {DataType} from '../../../../models/data-type';

@Component({
  selector: 'mg-manage-master-modal',
  templateUrl: './manage-master-modal.component.html',
  styleUrls: ['./manage-master-modal.component.scss']
})
export class ManageMasterModalComponent extends ModalBase implements OnInit {

  master: MasterEditModel = new MasterEditModel();
  editMode: boolean = true;
  form: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    middleName: [''],
    birthday: [''],
    cardImage: [''],
    masterDescriptions: [''],
    masterAchievements: [''],
    email: [''],
    phone: ['']
  });

  constructor(private fb: FormBuilder,
              private masterService: MasterService) {
    super();
  }

  ngOnInit(): void {
  }

  displayEditMaster(master: MasterEditModel, edit: boolean = true) {
    this.editMode = edit;
    this.master = master;
    this.form.reset({
      firstName: master.firstName,
      lastName: master.lastName,
      middleName: master.middleName,
      birthday: master.birthday,
      // cardImage: master.profiles?.find(s => s.name == 'CardMasterAvatarImage')?.value ?? '',
      masterDescriptions: master.profiles?.find(s => s.name == 'MasterDescriptions')?.value ?? '',
      masterAchievements: this.arrayToString(master.profiles?.find(s => s.name == 'CardMasterAchievements')),
      email: '',
      phone: ''
    });
    this.open();
  }

  private editor: Quill | null = null;

  setEditor(editor: any) {
    this.editor = editor as Quill;
  }

  private arrayToString(setting: GeneralSettingVm | undefined): string {
    if (setting == null)
      return '';

    const values = parseValue(setting) as string[];
    return values.join('<br>');
  }

  submit() {
    this.master.firstName = this.form.get('firstName')?.value;
    this.master.lastName = this.form.get('lastName')?.value;
    this.master.middleName = this.form.get('middleName')?.value;
    this.master.birthday = this.form.get('birthday')?.value;
    this.master.phone = this.form.get('phone')?.value;
    this.master.email = this.form.get('email')?.value;
    const masterDescriptions = this.form.get('masterDescriptions')?.value ?? '';
    setOrCreateSetting(this.master.profiles, 'MasterDescriptions', masterDescriptions, DataType.Html)
    const cardMasterAchievements = this.form.get('masterAchievements')?.value ?? '';
    setOrCreateSetting(this.master.profiles, 'CardMasterAchievements', masterDescriptions, DataType.Json)
    // this.master.profiles = ;
    // this.master.profiles = this.form.get('CardMasterAchievements')?.value;
  }
}
