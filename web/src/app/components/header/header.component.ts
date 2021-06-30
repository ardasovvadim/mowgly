import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointService} from '../../services/breakpoint.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

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

  constructor(private breakpointService: BreakpointService) {
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

}
