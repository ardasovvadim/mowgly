import {Injectable} from '@angular/core';
import {ApiService} from '../../app/services/api.service';
import {Observable} from 'rxjs';
import {
    TimetableRecordEditModel,
    AdminTimetableRecordsResponse
} from '../../app/models/timetable-records/timetable-record.view.model';
import {TRSearchCriteriaRequest} from '../../app/models/timetable-records/timetable-record-search-criteria.request';
import {TimetableApiService} from '../../app/services/timetable-api.service';

@Injectable()
export class ManageTimetableApiService extends TimetableApiService {

    constructor(
        api: ApiService
    ) {
        super(api);
    }

    getTimeTableRecords(request: TRSearchCriteriaRequest): Observable<AdminTimetableRecordsResponse> {
        return this.api.post(this.servicePrefix + '/GetTimeTableRecordsAsync', request);
    }

    addTimetableRecordAsync(request: TimetableRecordEditModel): Observable<TimetableRecordEditModel> {
        return this.api.post<TimetableRecordEditModel>(`${this.servicePrefix}/AddTimetableRecordAsync`, request);
    }

    delete(id: string): Observable<void> {
        return this.api.delete(this.servicePrefix + '/' + id);
    }
}

