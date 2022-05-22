import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {LocationViewModel} from '../models/locations/location.view.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {

  protected baseServiceName: string = 'location';

  constructor(
      protected readonly apiService: ApiService
  ) { }

  public getAll(): Observable<LocationViewModel[]> {
    return this.apiService.get<LocationViewModel[]>(this.baseServiceName);
  }

}
