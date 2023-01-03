import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {ComponentState, MgComponentService} from '../../../../services/mg-component.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'mg-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss'],
    providers: []
})
export class UserProfilePageComponent implements AfterContentInit, OnDestroy {

    currentTab: number = 0;

    constructor(
        private readonly componentService: MgComponentService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.componentService.changeState({isFooterBar: false} as ComponentState);
    }

    ngOnInit(): void {
        this.activatedRoute.url.subscribe(() => {
            const data: any = this.activatedRoute.snapshot.firstChild.data;
            this.currentTab = data?.index ?? 0;
        })
    }

    ngOnDestroy(): void {
        this.componentService.changeState({isFooterBar: true} as ComponentState)
    }

    ngAfterContentInit(): void {
    }
}
