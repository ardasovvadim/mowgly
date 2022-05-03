import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalBase} from '../../../../interfaces/modal-base';
import {SectionEditModel} from '../../../../models/sections/section.view.model';
import {ManageModal} from '../../../components/manage-modal/manage-modal';

@Component({
  selector: 'mg-manage-section-modal',
  templateUrl: './manage-section-modal.component.html',
  styleUrls: ['./manage-section-modal.component.scss']
})
export class ManageSectionModalComponent extends ManageModal {

  isEditMode = false;
  location: SectionEditModel = {} as SectionEditModel;
  form: FormGroup = this.fb.group({
    id: [''],
    name: [''],
    cardHeader: [''],
    cardDescription: [''],
    cardOrder: [''],
    cardColumn: ['']
  });

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  submit() {
    // this.locationService
    //   .save(this.form.value)
    //   .subscribe(_ => {
    //     this.submittedAndClosed.emit();
    //     this.close();
    //   });
  }

  show(obj: SectionEditModel) {
    this.location = obj;
    this.form.reset(obj, {emitEvent: false});
    this.open();
  }

  delete() {
    // this.locationService
    //   .delete(this.location.id)
    //   .subscribe(_ => {
    //     this.submittedAndClosed.emit();
    //     this.close();
    //   });
  }

  cancel() {
    this.close();
  }

}
