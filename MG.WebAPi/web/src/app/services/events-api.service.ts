import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {EventVm} from '../models/events/event-vm';
import {Page} from '../models/page';
import {PageRequest} from '../models/page-request';

@Injectable()
export class EventsApiService {

  protected readonly baseUrl = 'event'

  constructor(
    protected readonly api: ApiService
  ) { }

  getList(request: GetEventListRequest): Observable<Page<EventVm>> {
    if (request.actionDate === '')
      request.actionDate = null;
    return this.api.post(this.baseUrl + "/list", request);
  }
}

export interface GetEventListRequest extends PageRequest {
  filterText?: string;
  actionDate?: string;
}
