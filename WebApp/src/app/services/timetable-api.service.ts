import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {
  TimetableRecordEditModel, AdminTimetableRecordsResponse,
  TimetableRecordLocationGroupVm
} from '../models/timetable-records/timetable-record.view.model';
import {Observable} from 'rxjs';
import {TRSearchCriteriaRequest} from '../models/timetable-records/timetable-record-search-criteria.request';

@Injectable()
export class TimetableApiService {

  protected readonly servicePrefix: string = 'timetablerecord';

  constructor(protected api: ApiService) { }

  getTimetableRecordsBySeachCriteria(searchCriteria: TRSearchCriteriaRequest): Observable<TimetableRecordLocationGroupVm[]> {
    return this.api.post<TimetableRecordLocationGroupVm[]>(`${this.servicePrefix}/GetTimeTableRecordsByCriteria`, searchCriteria);
  }

}
