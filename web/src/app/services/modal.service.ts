import {Injectable} from '@angular/core';
import {ModalBase, ModalDataType} from '../interfaces/modal-base';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _$createModal: Subject<ModalDataType<any>> = new Subject<ModalDataType<any>>();
  private readonly _$deleteModal: Subject<ModalBase> = new Subject<ModalBase>();

  constructor() { }

  public createModal<T extends ModalBase>(modal: any): Observable<T | null> {
    const typedModal = modal as ModalDataType<T>;
    if (typedModal != null) {
      typedModal.callback = new BehaviorSubject<T | null>(null);
      this._$createModal.next(typedModal);
      return typedModal.callback.asObservable();
    }

    throw new Error("\"modal\" param has unsupported type");
  }

  public deleteModal<T extends ModalBase>(modal: T): void {
    this._$deleteModal.next(modal);
  }

  public get $createModal(): Observable<ModalDataType<any>> {
    return this._$createModal.asObservable();
  }

  public get $deleteModal(): Observable<ModalBase> {
    return this._$deleteModal.asObservable();
  }

}
