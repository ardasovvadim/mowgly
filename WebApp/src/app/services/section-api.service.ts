import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {SectionVm} from '../models/sections/section.view.model';

@Injectable({
  providedIn: 'root'
})
export class SectionApiService {

  private readonly baseServicePrefix: string = 'section';

  constructor(private api: ApiService) { }

  public getSectionByLocationId(locationId: string): Observable<SectionVm[]> {
    return this.api.post<SectionVm[]>(`${this.baseServicePrefix}/GetSectionsByLocationId`, {locationId: locationId});
  }

}
