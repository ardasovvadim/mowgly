import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBase} from '../../../interfaces/modal-base';
import {FormGroup} from '@angular/forms';
import {Indexer} from '../../../utils/utils';

@Component({
  selector: 'mg-manage-modal',
  templateUrl: './manage-modal.component.html',
  styleUrls: ['./manage-modal.component.scss']
})
export class ManageModalComponent {

  @Input() id: string = `manage-modal-${Indexer.getId()}`;
  @Input() title: string = 'Форма редактирования';
  @Input() form: FormGroup = new FormGroup({});
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Input() style: 'container' | 'center' = 'center';

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
