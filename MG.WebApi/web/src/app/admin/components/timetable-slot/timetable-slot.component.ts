import {Component, Input, OnInit} from '@angular/core';
import {IdName, TimetableRecordEditModel} from '../../../models/timetable-records/timetable-record.view.model';
import * as moment from 'moment';
import {MgOptions} from '../../../services/options-api.service';

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

  @Input() options: MgOptions;
  @Input() masters: IdName[];

  get master(): string {
    if (this.originData && this.masters?.length) {
      const master = this.masters.find(m => m.id == this.originData.masterId);
      return master?.name ?? '';
    }
    return '';
  }

  get location(): string {
    if (this.originData && this.options?.locations?.length) {
      return this.options.locations.find(m => m.id == this.originData.locationId)?.name ?? '';
    }
    return '';
  }

  get section(): string {
    if (this.originData && this.options?.sections?.length) {
      return this.options.sections.find(m => m.id == this.originData.sectionId)?.name ?? '';
    }
    return '';
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
