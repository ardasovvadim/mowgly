import {Component} from '@angular/core';
import {ModalBase} from '../../../interfaces/modal-base';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'mg-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends ModalBase {

  options: ConfirmDialogOptions;
  answerSub: Subject<AnswerType>;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  cancel() {
    this.returnAnswerAndClose(AnswerType.No);
  }

  yes() {
    this.returnAnswerAndClose(AnswerType.Yes);
  }

  returnAnswerAndClose(answer: AnswerType) {
    this.answerSub.next(answer);
    this.answerSub.complete();
    this.answerSub = null;
    this.options = null;
    this.close();
  }

  show(options: ConfirmDialogOptions): Observable<AnswerType> {
    this.options = options;
    this.answerSub = new Subject<AnswerType>();
    this.open();
    return this.answerSub.asObservable();
  }
}

export interface ConfirmDialogOptions {
  text: string;
  title: string;
  yesBtnText: string;
  noBtnText: string;
}

export enum AnswerType {
  Yes,
  No
}
