import {Component} from '@angular/core';
import {ModalBase} from '../../../interfaces/modal-base';
import {TRSearchCriteriaRequest} from '../../../models/timetable-records/timetable-record-search-criteria.request';
import {Observable} from 'rxjs';
import {
  TimetableRecordLocationGroupVm,
  TimetableRecordVm
} from '../../../models/timetable-records/timetable-record.view.model';
import {TimetableService} from '../../../services/timetable.service';
import {DayOfWeek} from '../../../models/timetable-records/day-of-week';

@Component({
  selector: 'mg-timetable-record-modal',
  templateUrl: './timetable-record-modal.component.html',
  styleUrls: ['./timetable-record-modal.component.scss'],
  providers: [TimetableService]
})
export class TimetableRecordModalComponent extends ModalBase  {

  $timetableGroups: Observable<TimetableRecordLocationGroupVm[]> | null = null;

  constructor(private timetableService: TimetableService) {
    super();
  }

  displayTimetableRecords(criteria: TRSearchCriteriaRequest): void {
    this.$timetableGroups = this.timetableService.getTimetableRecords(criteria);
    this.$timetableGroups.subscribe(_ => super.open());
  }

  displayTime(timetables: TimetableRecordVm[], day: DayOfWeek) {
    const timetable = timetables?.find(t => t.dayOfWeek == day);
    return timetable != null ? `${timetable.startTime} - ${timetable.endTime}` : '-';
  }

}
