import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {IdName, LocationSectionOptions} from '../models/timetable-records/timetable-record.view.model';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class OptionsApiService {

  private readonly baseUrl = 'options'

  constructor(
    private readonly api: ApiService
  ) { }

  getOptions(request: OptionsRequest): Observable<MgOptions> {
    return this.api.post(this.baseUrl, request);
  }

  getLocationOptions(): Observable<IdName[]> {
    return this.api.get(this.baseUrl + "/location");
  }

  getMasterOptions(filterName: string = null): Observable<IdName[]> {
    const params = new HttpParams()
        .set('filterName', filterName)
    ;
    return this.api.get(this.baseUrl + "/master", params);
  }

  getSectionOptions(locationId: string, filterText: string = null, exceptLocationIds: string[] = null): Observable<IdName[]> {
    let params = new HttpParams()
    if (locationId)
      params = params.set('locationId', locationId)
    if (filterText)
      params = params.set('filterText', filterText)
    if (exceptLocationIds && exceptLocationIds.length > 0)
      params = params.set('exceptLocationIds', exceptLocationIds.join(', '))
    return this.api.get(this.baseUrl + "/section", params);
  }

  getEvents(filterText: string, date: string): Observable<IdName[]> {
    let params = new HttpParams();
    if (filterText)
      params = params.set('filterName', filterText);
    if (date)
      params = params.set('date', date);

    return this.api.get(this.baseUrl + '/event', params);
  }

  getCities(): Observable<string[]> {
    return this.api.get(this.baseUrl + '/cities');
  }
}

export interface OptionsRequest {
  cities?: boolean;
  locations?: boolean;
  sections?: boolean;
  locationSections?: boolean;
}

export interface MgOptions {
  cities?: IdName[];
  locations?: IdName[];
  sections?: IdName[];
  locations2?: LocationSectionOptions[];
}
