import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {
  TimetableRecordEditModel, TimetableRecordEditModelResponse,
  TimetableRecordLocationGroupVm
} from '../models/timetable-records/timetable-record.view.model';
import {Observable} from 'rxjs';
import {TRSearchCriteriaRequest} from '../models/timetable-records/timetable-record-search-criteria.request';

@Injectable()
export class TimetableService {

  private readonly servicePrefix: string = 'timetablerecord';

  constructor(private api: ApiService) { }

  getTimetableRecords(searchCriteria: TRSearchCriteriaRequest): Observable<TimetableRecordLocationGroupVm[]> {
    return this.api.post<TimetableRecordLocationGroupVm[]>(`${this.servicePrefix}/GetTimeTableRecordsByCriteria`, searchCriteria);
  }

  getTimeTableRecordEditModels(searchCriteria: TRSearchCriteriaRequest): Observable<TimetableRecordEditModelResponse> {
    return this.api.post<TimetableRecordEditModelResponse>(`${this.servicePrefix}/GetTimeTableRecordEditModels`, searchCriteria);
  }

}
