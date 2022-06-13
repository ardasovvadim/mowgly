import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointService} from '../../../services/breakpoint.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router} from '@angular/router';
import {UiKit} from '../../../utils/ui-kit';
import {scrollTo} from '../../../utils/utils';
import {AuthenticationService} from '../../../services/authentication.service';
import {Observable} from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'mg-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public isLargeMenu: boolean;
    public links = [
        {name: 'Главная', link: '/'},
        {name: 'Новости', link: '/news'},
        {name: 'Ближайшие события', link: '/events'},
        {
            name: 'Клубная информация',
            children: [
                {name: 'Расписание', link: '/schedule'},
                {name: 'Календарь событий', link: '/events'},
                {name: 'Данкай', link: '/events'},
            ]
        },
        {name: 'Как нас найти', link: '#'},
    ]

    isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

    constructor(
        private readonly breakpointService: BreakpointService,
        private readonly router: Router,
        private readonly authService: AuthenticationService
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

    goToLink(link: string) {
        if (!this.isLargeMenu)
            UiKit.offcanvas('#offcanvas-overlay').hide();

        if (link === '#') {
            scrollTo('el-9', -200);
            return;
        }

        this.router.navigate([link]);
    }

    logout() {
        this.authService.logout();
    }

    goToProfile() {
        this.router.navigate(['/user-profile']);
    }
}
