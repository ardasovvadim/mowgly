import {Component, Input, OnInit} from '@angular/core';
import {TimetableRecordEditModel} from '../../../models/timetable-records/timetable-record.view.model';
import * as moment from 'moment';

@Component({
  selector: 'mg-timetable-slot',
  templateUrl: './timetable-slot.component.html',
  styleUrls: ['./timetable-slot.component.scss']
})
export class TimetableSlotComponent implements OnInit {

  @Input() set data(value: TimetableRecordEditModel) {
    this.originData = value;
    const startTime = moment(value.startTime, 'HH:mm');
    const endTime = moment(value.endTime, 'HH:mm');
    const minutes = endTime.diff(startTime, 'minutes');
    this.yDelta = this.slotDeltaHeight * (startTime.minutes() % 30);
    this.calculatedHeight = this.slotDeltaHeight * minutes;
  }

  readonly slotTime = 30;
  readonly slotHeight = 100;
  readonly slotDeltaHeight = this.slotHeight / this.slotTime;

  originData: TimetableRecordEditModel | null = null;
  calculatedHeight = 0;
  yDelta = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
