import {Directive, ElementRef, HostBinding, Input, OnChanges} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

export const smoothHeight = trigger('grow', [
  transition('void <=> *', []),
  transition('* <=> *', [style({ height: '{{startHeight}}px', opacity: 0 }), animate('.5s ease')], {
    params: { startHeight: 0 }
  })
]);

@Directive({
  selector: '[smoothHeight]',
  host: { '[style.display]': '"block"', '[style.overflow]': '"hidden"' }
})
export class SmoothHeightAnimDirective implements OnChanges {

  @Input()
  smoothHeight;
  pulse: boolean;
  startHeight: number;

  constructor(private element: ElementRef) {}

  @HostBinding('@grow')
  get grow() {
    return { value: this.pulse, params: { startHeight: this.startHeight } };
  }

  setStartHeight() {
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges(changes) {
    this.setStartHeight();
    this.pulse = !this.pulse;
  }

}
