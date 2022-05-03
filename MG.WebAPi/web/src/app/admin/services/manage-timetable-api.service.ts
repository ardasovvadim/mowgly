import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {TimetableRecordEditModelResponse} from '../../models/timetable-records/timetable-record.view.model';
import {TRSearchCriteriaRequest} from '../../models/timetable-records/timetable-record-search-criteria.request';

@Injectable()
export class ManageTimetableApiService {

  protected readonly baseUrl = 'timetablerecord';

  constructor(
    protected api: ApiService
  ) { }

  getRecords(request: TRSearchCriteriaRequest): Observable<TimetableRecordEditModelResponse> {
    return this.api.post(this.baseUrl + '/GetTimeTableRecordEditModels', request);
  }

}

