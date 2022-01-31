import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {LocationViewModel} from '../models/locations/location.view.model';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseServiceName: string = 'location';

  constructor(private apiService: ApiService) { }

  public getAll(): Observable<LocationViewModel[]> {
    return this.apiService.get<LocationViewModel[]>(this.baseServiceName);
  }

  save(location: LocationViewModel): Observable<void> {
    return this.apiService.post<void>(`${this.baseServiceName}`, location);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseServiceName}/${id}`);
  }
}
