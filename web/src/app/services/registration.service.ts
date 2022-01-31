import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {PersonalDataModel} from '../models/registration/personal-data.model';
import {Observable} from 'rxjs';

@Injectable()
export class RegistrationService {

  private servicePrefix = 'registration';

  constructor(private api: ApiService) { }

  register(personalData: PersonalDataModel): Observable<any> {
    return this.api.post<any>(`${this.servicePrefix}/`, personalData);
  }
}
