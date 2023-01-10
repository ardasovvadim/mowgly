import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../../../app/services/user.service';

@Directive({
    selector: '[mgMgIfPerm]'
})
export class MgIfPermDirective implements OnInit {

    private permissions: string[] = [];
    private requiredPermission: string = null;

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.profile$.subscribe(profile => {
            this.permissions = profile.permissions;
            this.updateView();
        });
    }

    @Input()
    set mgMgIfPerm(requiredPermission: string) {
        this.requiredPermission = requiredPermission;
        this.updateView();
    }

    private updateView() {
        const isGranted = this.checkPermission();

        if (isGranted && !this.viewContainer.length) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }

        if (!isGranted) {
            this.viewContainer.clear();
        }
    }

    private checkPermission(): boolean {
        return !this.requiredPermission
            || (this.permissions?.length && this.permissions.includes(this.requiredPermission))
    }

}
