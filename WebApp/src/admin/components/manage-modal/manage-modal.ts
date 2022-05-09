import {EventEmitter, Injectable, Output} from '@angular/core';
import {ModalBase} from '../../../app/interfaces/modal-base';

@Injectable()
export class ManageModal extends ModalBase {
  @Output() onSubmittedAndClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeleteClicked: EventEmitter<void> = new EventEmitter<void>();
}
