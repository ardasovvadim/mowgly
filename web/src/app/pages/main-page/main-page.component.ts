import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
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
    'assets/img/photo-1.png',
    'assets/img/photo-2.png',
    'assets/img/photo-3.png',
  ]

  constructor(private masterService: MasterService) {

  }

  ngOnInit(): void {
    const request = new MasterSearchCriteria();
    this.masterService
      .getCardMasters(request)
      .subscribe(masters => this.masters = masters);
  }

}
