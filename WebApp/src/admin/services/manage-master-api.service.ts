import {Injectable} from '@angular/core';
import {MasterApiService} from '../../app/services/master-api.service';
import {ApiService} from '../../app/services/api.service';
import {Observable} from 'rxjs';
import {AdminMasterVm, GetMasterListRequest, MasterEditModel} from '../models/master-edit-model';
import {Page} from '../../app/models/page';

@Injectable()
export class ManageMasterApiService extends MasterApiService {

    constructor(protected api: ApiService) {
        super(api);
    }

    getEditModel(id: string): Observable<MasterEditModel> {
        return this.api.get(`${this.servicePrefix}/GetEditModel/${id}`);
    }

    getList(request: GetMasterListRequest): Observable<Page<AdminMasterVm>> {
        return this.api.post(`${this.servicePrefix}`, request);
    }

    save(request: MasterEditModel): Observable<MasterEditModel> {
        return this.api.post(`${this.servicePrefix}/SaveEditModel`, request);
    }

    delete(id: string): Observable<void> {
        return this.api.delete(this.servicePrefix + '/' + id);
    }
}
