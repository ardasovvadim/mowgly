import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {Indexer} from '../../utils/utils';

@Directive({
    selector: '[mgLoading]'
})
export class LoadingDirective implements AfterViewInit {

    private id = Indexer.getId()
    private indicator: any;

    @Input() set mgLoading(value: boolean) {
        const el = this.targetRef.nativeElement;

        if (value) {
            el.classList.add('mg-loading')

            this.indicator = this.render.createElement('div')
            this.indicator.id = this.id;
            this.indicator.setAttribute('uk-spinner', '');
            this.render.appendChild(el, this.indicator);

        } else {
            el.classList.remove('mg-loading')

            this.render.removeChild(el, this.indicator);
        }
    }

    constructor(
        private targetRef: ElementRef,
        private readonly render: Renderer2
    ) {
    }

    ngAfterViewInit(): void {
        this.targetRef.nativeElement.style.position = 'relative';
        this.targetRef.nativeElement.style.overflow = 'hidden';
    }

}
