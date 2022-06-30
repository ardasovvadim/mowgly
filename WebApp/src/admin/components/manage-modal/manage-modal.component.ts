import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Indexer} from '../../../app/utils/utils';

@Component({
  selector: 'mg-manage-modal',
  templateUrl: './manage-modal.component.html',
  styleUrls: ['./manage-modal.component.scss']
})
export class ManageModalComponent {

  @Input() id: string = `manage-modal-${Indexer.getId()}`;
  @Input() title: string = 'Форма редагування';
  @Input() form: FormGroup = new FormGroup({});
  @Input() style: 'container' | 'center' = 'center';
  @Input() isDeleteButton = false;
  @Input() deletePerm: string = null;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    this.onSubmit.emit(this.form.value);
  }

  delete() {
    this.onDelete.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
