import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ImageCreateDto} from '../../admin/models/image.model';

@Injectable()
export class ManageImageApiService {

  private readonly servicePrefix: string = 'image';

  constructor(
      private readonly api: ApiService
  ) { }

  add(request: ImageCreateDto): Observable<string> {
    return this.api.post<string>(this.servicePrefix, request);
  }

  deleteImage(id: string): Observable<void> {
    return this.api.delete(this.servicePrefix + '/' + id);
  }

  deleteImages(ids: string[]): Observable<void> {
    return this.api.post(this.servicePrefix + '/delete', ids);
  }
}
