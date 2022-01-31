import { Injectable } from '@angular/core';
import {MasterService} from '../../services/master.service';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {MasterEditModel} from '../models/master-edit-model';

@Injectable()
export class ManageMasterService extends MasterService {

  constructor(protected api: ApiService) {
    super(api);
  }

  getEditModel(id: string): Observable<MasterEditModel> {
    return this.api.get(`${this.servicePrefix}/GetEditModel/${id}`);
  }

}
