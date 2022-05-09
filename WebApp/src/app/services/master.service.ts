import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {MasterVm} from '../models/masterVm';
import {MasterSearchCriteria} from '../models/masters/master-search-criteria.request';
import {map} from 'rxjs/operators';
import {Page} from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  protected readonly servicePrefix = 'master';

  constructor(protected api: ApiService) { }

  public getCardMasters(searchCriteria: MasterSearchCriteria): Observable<MasterVm[]> {
    return this.api.post<Page<MasterVm>>(`${this.servicePrefix}/GetCardMastersBySearchCriteria`, searchCriteria).pipe(map(page => page.elements));
  }

  public getMasterInfo(masterId: string): Observable<MasterVm> {
    return this.api.get<MasterVm>(`${this.servicePrefix}/${masterId}`);
  }

}
