import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[mgModalWrapper]'
})
export class ModalWrapperDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
