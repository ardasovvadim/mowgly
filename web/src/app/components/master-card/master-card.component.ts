import {Component, Input, OnInit} from '@angular/core';
import {MasterCardInfoModel} from '../../models/master-card-info.model';

@Component({
  selector: 'mg-master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.scss']
})
export class MasterCardComponent implements OnInit {

  @Input() public master: MasterCardInfoModel = new MasterCardInfoModel();

  constructor() { }

  ngOnInit(): void {
  }

}
