import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {MasterVm} from '../../../models/masterVm';
import {MgColors} from '../../../utils/mg-variables';

@Component({
  selector: 'mg-master-slider',
  templateUrl: './master-slider.component.html',
  styleUrls: ['./master-slider.component.scss']
})
export class MasterSliderComponent implements OnInit {

  @Input() cardBottomRef: TemplateRef<any> | null = null;
  @Input() masters: MasterVm[] = [];
  color = (): string => MgColors.getColor(this.controlColor);
  @Input() controlColor: string = 'green-main';

  constructor() { }

  ngOnInit(): void {
  }

}
