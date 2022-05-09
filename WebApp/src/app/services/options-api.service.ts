import { Injectable } from '@angular/core';
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

  getMasterOptions(filterName: string = null, sectionId: string = null): Observable<IdName[]> {
    const params = new HttpParams()
        .set('filterName', filterName)
        .set('sectionId', sectionId)
    ;
    return this.api.get(this.baseUrl + "/master", params);
  }

  getSectionOptions(locationId: string): Observable<IdName[]> {
    const params = new HttpParams().set('locationId', locationId)
    return this.api.get(this.baseUrl + "/section", params);
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
