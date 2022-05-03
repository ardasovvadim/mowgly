import {AfterViewInit, EventEmitter, Injectable, Output, Type} from '@angular/core';
import {Indexer} from '../utils/utils';
import {UiKit} from '../utils/ui-kit';
import {BehaviorSubject, Subject} from 'rxjs';

export class ModalDataType<T extends ModalBase> {
  constructor(public type: Type<T>, public callback: BehaviorSubject<T | null>) {
  }
}

export type MgAfterViewInit = () => void;

@Injectable()
export abstract class ModalBase implements AfterViewInit {

  public readonly id: string = `modal-${Indexer.getId()}`;
  protected options: any = {};
  private modalUiKitInst: any | null = null;
  private _callbackAfterViewInit: BehaviorSubject<this> | null = null;
  mgAfterViewInit: MgAfterViewInit;

  private checkUiKitInstance(): void {
    if (this.modalUiKitInst === null)
      throw new Error("ModalBase uikit instance should be initialized");
  }

  private initialize(): void {
    if (this.modalUiKitInst !== null)
      throw new Error("ModalBase uikit instance could be initialized at once")

    const ref = document.getElementById(this.id);
    if (!!ref)
      this.modalUiKitInst = UiKit.modal(ref, this.options);
  }

  public open(): void {
    this.checkUiKitInstance();

    this.modalUiKitInst.show();
  }

  public close(): void {
    this.checkUiKitInstance();

    this.modalUiKitInst.hide();
  }

  ngAfterViewInit(): void {
    this.initialize();
    if (this.mgAfterViewInit)
      this.mgAfterViewInit();
    this._callbackAfterViewInit?.next(this);
  }

  set callbackAfterViewInit(behaviourSubject: BehaviorSubject<this>) {
    this._callbackAfterViewInit = behaviourSubject;
  }

}
