import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {ModalWrapperDirective} from '../../directives/modal-wrapper.directive';
import {ModalBase, ModalDataType} from '../../../interfaces/modal-base';

@Component({
  selector: 'mg-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit {

  @ViewChild(ModalWrapperDirective, {static: true}) modalInjector!: ModalWrapperDirective;
  private modalRefs: ComponentRef<ModalBase>[] = [];

  constructor(private factory: ComponentFactoryResolver,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.$createModal.subscribe(modal => this.createModal(modal));
    this.modalService.$deleteModal.subscribe(modal => this.deleteModal(modal))
  }

  private createModal(modal: ModalDataType<any>) {
    const componentFactory = this.factory.resolveComponentFactory(modal.type);
    const modalRef = this.modalInjector.viewContainerRef.createComponent<ModalBase>(componentFactory);
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
