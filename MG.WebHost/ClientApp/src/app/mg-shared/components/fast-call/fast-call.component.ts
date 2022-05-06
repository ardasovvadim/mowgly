import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {Subscription, timer} from 'rxjs';
import * as moment from 'moment';
import {ModalService} from '../../../services/modal.service';
import {FastCallModalComponent} from './fast-call-modal/fast-call-modal.component';

@Component({
  selector: 'mg-fast-call',
  templateUrl: './fast-call.component.html',
  styleUrls: ['./fast-call.component.scss']
})
export class FastCallComponent implements OnInit, OnDestroy {

  isDisplayed = false;
  modal: FastCallModalComponent;

  private readonly displayAfterSeconds = 10 * 1000;
  private readonly repeatAfterDays = 1;
  private readonly key = 'fast-call';
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly storage: StorageService,
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    const lastDisplayedTime = this.storage.get<string>(this.key);

    if (!lastDisplayedTime) {
      this.initializeModalAndDisplay();
      return;
    }

    const result = moment(lastDisplayedTime).diff(moment(), 'days');
    if (result >= this.repeatAfterDays)
      this.initializeModalAndDisplay();
  }

  showModal() {
    this.modal?.open();
  }

  onClose() {
    this.logTime();
    this.isDisplayed = false;
  }

  ngOnDestroy(): void {
    this.modal && this.modalService.deleteModal(this.modal);
    this.subscriptions?.forEach(s => s.unsubscribe());
  }

  private initializeModalAndDisplay() {
    this.modalService.createModal<FastCallModalComponent>({type: FastCallModalComponent})
      .subscribe(modal => {
        this.modal = modal;
        if (modal) {

          let sub = this.modal.onSubmitted.subscribe(data => {
            // todo
            this.modal.close();
            this.onClose();
          })
          this.subscriptions.push(sub);

          sub = this.modal.onClosed.subscribe(() => {
            this.onClose();
          });
          this.subscriptions.push(sub);

          timer(this.displayAfterSeconds).subscribe(() => {
            this.isDisplayed = true;
          });

        }
      })
  }

  private logTime() {
    const lastDisplayedTime = moment().toString();
    this.storage.set(this.key, lastDisplayedTime);
  }
}
