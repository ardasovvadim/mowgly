import {Injectable} from '@angular/core';
import {ApiService} from '../../app/services/api.service';
import {Observable} from 'rxjs';
import {FilterPageRequest} from '../../app/models/page-request';
import {AdminSectionVm} from '../models/section.model';
import {Page} from '../../app/models/page';
import {SectionVm} from '../../app/models/sections/section.view.model';

@Injectable()
export class ManageSectionApiService {

  private servicePrefix = 'section';

  constructor(
      private readonly api: ApiService
  ) { }

  getList(request: FilterPageRequest): Observable<Page<AdminSectionVm>> {
    return this.api.post(this.servicePrefix + '/list', request);
  }

  getById(id: string): Observable<SectionVm> {
    return this.api.get(this.servicePrefix + '/' + id);
  }

  update(request: SectionVm) {
    return this.api.post(this.servicePrefix, request);
  }

  delete(id: string): Observable<void> {
    return this.api.delete(this.servicePrefix + '/' + id);
  }
}
