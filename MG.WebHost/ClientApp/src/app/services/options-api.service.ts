import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {IdName} from '../models/timetable-records/timetable-record.view.model';
import {Observable} from 'rxjs';

@Injectable()
export class OptionsApiService {

  private readonly baseUrl = 'options'

  constructor(
    private readonly api: ApiService
  ) { }

  getOptions(request: OptionsRequest): Observable<MgOptions> {
    return this.api.post(this.baseUrl, request);
  }

}

export interface OptionsRequest {
  cities?: boolean;
  locations?: boolean;
  sections?: boolean;
}

export interface MgOptions {
  cities?: IdName[];
  locations?: IdName[];
  sections?: IdName[];
}
