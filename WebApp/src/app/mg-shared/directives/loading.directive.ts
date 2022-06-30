import {
    ComponentRef,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import {LoaderComponent} from '../components/loader/loader.component';

@Directive({
    selector: '[mgLoading]'
})
export class LoadingDirective implements OnInit, OnChanges {

    @HostBinding("style.position") hostPosition: string = "relative";
    @HostBinding("style.overflow") overflow: string = "hidden";

    @Input() mgLoading: boolean = false;
    @Input() mgLoadingBg: boolean = true;
    private loader: ComponentRef<LoaderComponent>;

    @Input() loadingColor: 'white' | 'green' = 'green';

    constructor(
        private readonly targetRef: ElementRef,
        private readonly renderer: Renderer2,
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    ngOnInit(): void {
        this.loader = this.viewContainerRef.createComponent<LoaderComponent>(LoaderComponent);
        this.loader.instance.loading = this.mgLoading;
        this.loader.instance.loaderColor = this.loadingColor;
        this.loader.instance.loadingBg = this.mgLoadingBg;
        this.targetRef.nativeElement.appendChild(this.loader.location.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.loader)
            return;

        this.overflow = this.mgLoading ? 'hidden' : 'visible';
        this.loader.instance.loading = this.mgLoading;
    }

}
