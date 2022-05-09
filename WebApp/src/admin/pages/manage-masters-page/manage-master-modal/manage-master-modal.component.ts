import {Component, OnInit} from '@angular/core';
import {ModalBase} from '../../../../app/interfaces/modal-base';
import {MasterEditModel} from '../../../models/master-edit-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import Quill from 'quill';
import {GeneralSettingVm, parseValue, setOrCreateSetting} from '../../../../app/models/general-setting.view.model';
import {MasterService} from '../../../../app/services/master.service';
import {DataType} from '../../../../app/models/data-type';
import * as ClassicEditorBuild from 'ckeditor/build/ckeditor';

@Component({
  selector: 'mg-manage-master-modal',
  templateUrl: './manage-master-modal.component.html',
  styleUrls: ['./manage-master-modal.component.scss']
})
export class ManageMasterModalComponent extends ModalBase implements OnInit {

  master: MasterEditModel = {} as MasterEditModel;
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
    const BlockEmbed = Quill.import('blots/block/embed');
    class DividerBlot extends BlockEmbed { }
    // @ts-ignore
    DividerBlot.blotName = 'divider';
    // @ts-ignore
    DividerBlot.tagName = 'hr';
    Quill.register(DividerBlot);
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
      masterAchievements: master.profiles?.find(s => s.name == 'CardMasterAchievements')?.value ?? '',
      email: '',
      phone: ''
    });
    this.open();
  }

  private editor: Quill | null = null;
  Editor = ClassicEditorBuild;
  config = {
    language: 'ru',
    htmlSupport: true,
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'uk-h1' },
        { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'uk-h2' },
        { model: 'heading3', view: 'h4', title: 'Heading 3', class: 'uk-h3' }
      ]
    }
  };

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
    console.log(this.form.value)
    this.master.firstName = this.form.get('firstName')?.value;
    this.master.lastName = this.form.get('lastName')?.value;
    this.master.middleName = this.form.get('middleName')?.value;
    this.master.birthday = this.form.get('birthday')?.value;
    this.master.phone = this.form.get('phone')?.value;
    this.master.email = this.form.get('email')?.value;
    const masterDescriptions = this.form.get('masterDescriptions')?.value ?? '';
    setOrCreateSetting(this.master.profiles, 'MasterDescriptions', masterDescriptions, DataType.Html)
    const cardMasterAchievements = this.form.get('masterAchievements')?.value ?? '';
    setOrCreateSetting(this.master.profiles, 'CardMasterAchievements', cardMasterAchievements, DataType.Html);
    console.log(this.master);
    // this.master.profiles = ;
    // this.master.profiles = this.form.get('CardMasterAchievements')?.value;
  }
}
