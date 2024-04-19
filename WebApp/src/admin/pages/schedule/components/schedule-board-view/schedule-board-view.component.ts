import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from "moment/moment";

@Component({
  selector: 'mg-schedule-board-view',
  templateUrl: './schedule-board-view.component.html',
  styleUrls: ['./schedule-board-view.component.scss']
})
export class ScheduleBoardViewComponent implements OnInit {

  @Input() dayTimes: any;
  @Input() dayOfWeek: any;
  @Input() timeslot: any;
  @Input() options: any;
  @Input() masters: any;
  @Input() data: any;
  @Output() onEditTimeslot: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddTimeslot: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  isBusy(day: number, dayTime: string): boolean {
    return this.data?.some(r => {
      if (r.dayOfWeek != day)
        return false;

      const from = moment(dayTime, 'HH:mm');
      const to = from.clone().add(30, 'minutes');

      const startTime = moment(r.startTime, 'HH:mm');
      const endTime = moment(r.endTime, 'HH:mm');

      return from.isBetween(startTime, endTime, undefined, '[)')
          || to.isBetween(startTime, endTime, undefined, '(]')
    }) ?? false;
  }

  isBuildBusySlot(day: number, dayTime: string): boolean {
    return this.data.some(r => {
      const from = moment(dayTime, 'HH:mm');
      const to = from.clone().add(30, 'minutes');
      const startTime = moment(r.startTime, 'HH:mm');
      return r.dayOfWeek == day && startTime.isBetween(from, to, undefined, '[)');
    });
  }
}
