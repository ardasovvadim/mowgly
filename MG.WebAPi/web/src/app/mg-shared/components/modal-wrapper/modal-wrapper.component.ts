import {Component, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewChild} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {ModalWrapperDirective} from '../../directives/modal-wrapper.directive';
import {ModalBase, ModalDataType} from '../../../interfaces/modal-base';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'mg-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit {

  @ViewChild(ModalWrapperDirective, {static: true}) modalInjector!: ModalWrapperDirective;
  private modalRefs: ComponentRef<ModalBase>[] = [];

  private readonly exceptTypes: Type<any>[] = [
    ConfirmDialogComponent
  ]

  constructor(private factory: ComponentFactoryResolver,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.$createModal.subscribe(modal => this.createModal(modal));
    this.modalService.$deleteModal.subscribe(modal => this.deleteModal(modal));
    this.modalService.$clearModals.subscribe(() => {
      this.modalRefs.forEach(r => r.destroy());
    })
  }

  private createModal(modal: ModalDataType<any>) {
    const componentFactory = this.factory.resolveComponentFactory(modal.type);
    const modalRef = this.modalInjector.viewContainerRef.createComponent<ModalBase>(componentFactory);
    if (!this.exceptTypes.some(t => t instanceof modal.type))
      this.modalRefs.push(modalRef);
    const modalBase = modalRef.instance;
    modalBase.callbackAfterViewInit = modal.callback;
  }

  private deleteModal(modal: ModalBase) {
    const modalToRemove = this.modalRefs?.find(m => m?.instance?.id == modal?.id);

    if (modalToRemove != null) {
      const index = this.modalRefs.indexOf(modalToRemove);
      modalToRemove.destroy();
      delete this.modalRefs[index];
    }
  }
}
