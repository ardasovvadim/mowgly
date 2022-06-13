import { Component, OnInit } from '@angular/core';
import {MgComponentService} from '../../services/mg-component.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'mg-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  isFooter: Observable<boolean> = this.mgComponentService.componentState$.pipe(
      map(state => state.isBottomMap)
  )

  constructor(
      private readonly mgComponentService: MgComponentService
  ) { }

  ngOnInit(): void {
  }

}
