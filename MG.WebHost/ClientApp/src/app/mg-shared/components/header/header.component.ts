import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointService} from '../../../services/breakpoint.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router} from '@angular/router';
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
    {name: 'Главная', link: '/'},
    {name: 'Новости', link: '/news'},
    {name: 'Ближайшие события', link: '/events'},
    {
      name: 'Клубная информация', link: '/',
      children: [
        {name: 'Расписание', link: '/schedule'},
        {name: 'Календарь событий', link: '/events'},
        {name: 'Данкай', link: '/events'},
      ]
    },
    {name: 'Как нас найти', link: '#'},
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
    if (!this.isLargeMenu)
      UiKit.offcanvas("#offcanvas-overlay").hide();

    if (link === '#') {
      scrollTo('el-9', -200);
      return;
    }

    this.router.navigate([link]);
  }
}
