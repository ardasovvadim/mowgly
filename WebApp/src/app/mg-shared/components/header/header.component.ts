import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointService} from '../../../services/breakpoint.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {UiKit} from '../../../utils/ui-kit';
import {scrollTo} from '../../../utils/utils';

@UntilDestroy()
@Component({
    selector: 'mg-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public isLargeMenu: boolean;
    public links = [
        {name: 'Головна', link: '/'},
        {name: 'Новини', link: '/news'},
        {name: 'Найближчі події', link: '/events'},
        {
            name: 'Клубна інформація',
            children: [
                {name: 'Розклад', link: '/schedule'},
                {name: 'Календар подій', link: '/events'},
                {name: 'Інструктора', link: '/masters'}
            ]
        },
        {name: 'Як нас знайти', link: '/contacts'},
    ]

    constructor(
        private readonly breakpointService: BreakpointService,
    ) {
        this.isLargeMenu = breakpointService.isMatchedMinLgBreakpoint;
        this.breakpointService.minLgBreakpoint$
            .pipe(untilDestroyed(this))
            .subscribe(value => {
                if (this.isLargeMenu != value) { // @ts-ignore
                    this.isLargeMenu = value;
                }
            });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onRouteChange(link: string) {
        if (!this.isLargeMenu)
            UiKit.offcanvas('#offcanvas-overlay').hide();

        if (link === '#') {
            scrollTo('el-9', -200);
            return;
        }
    }
}
