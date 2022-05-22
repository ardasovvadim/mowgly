import {Injectable} from '@angular/core';
import {LocationApiService} from '../../app/services/location-api.service';
import {Observable} from 'rxjs';
import {ApiService} from '../../app/services/api.service';
import {LocationEditModel} from '../models/location.model';

@Injectable()
export class ManageLocationApiService extends LocationApiService {

  constructor(
      api: ApiService
  ) {
    super(api);
  }

  save(location: LocationEditModel): Observable<LocationEditModel> {
    return this.apiService.post<LocationEditModel>(`${this.baseServiceName}`, location);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.baseServiceName}/${id}`);
  }

  getById(id: string): Observable<LocationEditModel> {
    return this.apiService.get<LocationEditModel>(this.baseServiceName + '/' + id);
  }
}
