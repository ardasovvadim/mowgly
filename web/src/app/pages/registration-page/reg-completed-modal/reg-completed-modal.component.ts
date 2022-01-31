import {Component, EventEmitter} from '@angular/core';
import {Indexer} from '../../../utils/utils';
import {ModalBase} from '../../../interfaces/modal-base';
import {Router} from '@angular/router';

@Component({
  selector: 'mg-reg-completed-modal',
  templateUrl: './reg-completed-modal.component.html',
  styleUrls: ['./reg-completed-modal.component.scss']
})
export class RegCompletedModalComponent extends ModalBase {

  onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {
    super();
  }

  closeAndGoMain() {
    this.onClose.emit();
    this.close();
    this.router.navigate(['/'])
  }
}
