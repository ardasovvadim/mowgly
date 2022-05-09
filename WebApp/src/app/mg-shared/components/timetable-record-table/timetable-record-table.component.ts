import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {
  TimetableRecordLocationGroupVm,
  TimetableRecordVm
} from '../../../models/timetable-records/timetable-record.view.model';
import {TimetableApiService} from '../../../services/timetable-api.service';
import {TRSearchCriteriaRequest} from '../../../models/timetable-records/timetable-record-search-criteria.request';
import {DayOfWeek} from '../../../models/timetable-records/day-of-week';
import {map} from 'rxjs/operators';

@Component({
  selector: 'mg-timetable-record-table',
  templateUrl: './timetable-record-table.component.html',
  styleUrls: ['./timetable-record-table.component.scss'],
  providers: [TimetableApiService]
})
export class TimetableRecordTableComponent implements OnInit {

  timetableGroups: TimetableRecordLocationGroupVm[];

  constructor(private timetableService: TimetableApiService) {
  }

  ngOnInit(): void {
  }

  displayTimetableRecords(criteria: TRSearchCriteriaRequest): Observable<void> {
    return this.timetableService.getTimetableRecordsBySeachCriteria(criteria).pipe(
      map(data => {
        this.timetableGroups = data;
      })
    );
  }

  displayTime(timetables: TimetableRecordVm[], day: DayOfWeek) {
    const timetable = timetables?.find(t => t.dayOfWeek == day);
    return timetable != null ? `${timetable.startTime} - ${timetable.endTime}` : '-';
  }

}
