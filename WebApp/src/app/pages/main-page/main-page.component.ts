import {Component, OnInit} from '@angular/core';
import {MasterApiService} from '../../services/master-api.service';
import {MasterVm} from '../../models/masterVm';
import {MasterSearchCriteria} from '../../models/masters/master-search-criteria.request';

@Component({
  selector: 'mg-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public masters: MasterVm[] = [];
  imgPaths: string[] = [
    'assets/img/photo-1.webp',
    'assets/img/photo-2.webp',
    'assets/img/photo-3.webp',
  ]

  constructor(private masterService: MasterApiService) {

  }

  ngOnInit(): void {
    this.masterService
      .getCardMasters({
        pageSize: 5
      } as MasterSearchCriteria)
      .subscribe(masters => this.masters = masters);
  }

}
