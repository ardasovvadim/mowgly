import {ModalBase} from '../../../interfaces/modal-base';
import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ManageModal extends ModalBase {
  @Output() onSubmittedAndClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeleteClicked: EventEmitter<void> = new EventEmitter<void>();
}
