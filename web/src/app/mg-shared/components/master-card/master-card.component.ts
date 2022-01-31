import {Component, Input, OnInit} from '@angular/core';
import {MasterVm} from '../../../models/masterVm';

@Component({
  selector: 'mg-master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.scss']
})
export class MasterCardComponent implements OnInit {

  @Input() public master: MasterVm = new MasterVm();

  constructor() { }

  ngOnInit(): void {
  }

}
