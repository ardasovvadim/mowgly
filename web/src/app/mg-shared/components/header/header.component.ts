import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointService} from '../../../services/breakpoint.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router} from '@angular/router';
import {UiKit} from '../../../utils/ui-kit';

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
    {name: 'Ближайшие события', link: '/'},
    {
      name: 'Клубная информация', link: '/',
      children: [
        {name: 'Расписание', link: '/'},
        {name: 'Календарь событий', link: '/'},
        {name: 'Данкай', link: '/'},
      ]
    },
    {name: 'Как нас найти', link: '/'},
  ]

  constructor(private breakpointService: BreakpointService,
              private router: Router) {
    this.isLargeMenu = breakpointService.isMatchedMinLgBreakpoint;
    this.breakpointService.minLgBreakpoint$
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        if (this.isLargeMenu != value)
          this.isLargeMenu = value;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  goToLink(link: string) {
    this.router
      .navigate([link])
      .finally(() => UiKit.offcanvas("#offcanvas-overlay").hide());
  }
}
