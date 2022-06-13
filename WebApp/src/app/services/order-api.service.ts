import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {PersonalDataModel} from '../models/registration/personal-data.model';
import {Observable} from 'rxjs';

@Injectable()
export class OrderApiService {

  protected readonly servicePrefix = 'order';

  constructor(
      protected api: ApiService
  ) { }

  register(personalData: PersonalDataModel): Observable<any> {
    return this.api.post<any>(`${this.servicePrefix}/`, personalData);
  }
}
