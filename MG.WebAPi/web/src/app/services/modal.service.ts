import {EventEmitter, Injectable} from '@angular/core';
import {ModalBase, ModalDataType} from '../interfaces/modal-base';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {
  AnswerType,
  ConfirmDialogComponent,
  ConfirmDialogOptions
} from '../mg-shared/components/confirm-dialog/confirm-dialog.component';
import {filter, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _$createModal: Subject<ModalDataType<any>> = new Subject<ModalDataType<any>>();
  private readonly _$deleteModal: Subject<ModalBase> = new Subject<ModalBase>();
  private readonly _$clearModals: EventEmitter<void> = new EventEmitter<void>();

  private confirmDialog: ConfirmDialogComponent;

  constructor() {
  }

  private createConfirmDialog(): Observable<ConfirmDialogComponent> {
    if (this.confirmDialog)
      return of(this.confirmDialog);

    return this.createModal<ConfirmDialogComponent>({type: ConfirmDialogComponent})
      .pipe(
        filter(modal => modal != null),
        tap(modal => {
          if (modal) {
            this.confirmDialog = modal;
          }
        })
      );
  }

  public createModal<T extends ModalBase>(modal: any): Observable<T | null> {
    const typedModal = modal as ModalDataType<T>;
    if (typedModal != null) {
      typedModal.callback = new BehaviorSubject<T | null>(null);
      this._$createModal.next(typedModal);
      return typedModal.callback.asObservable();
    }

    throw new Error("\"modal\" param has unsupported type");
  }

  public displayConfirmDialog(options: ConfirmDialogOptions | any = {}): Observable<AnswerType> {
    return this.createConfirmDialog().pipe(
      switchMap(modal => {
        return modal.show(options as ConfirmDialogOptions);
      })
    )
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

  public get $clearModals(): Observable<void> {
    return this._$clearModals.asObservable();
  }

  public clearModals(): void {
    this._$clearModals.emit();
  }

}
