import {Injectable} from '@angular/core';
import {ApiService} from '../../app/services/api.service';
import {Page} from '../../app/models/page';
import {Observable} from 'rxjs';
import {AdminUserVm, UserEditModel, UserGetListRequest} from '../models/user.model';

@Injectable()
export class ManageUserApiService {

    readonly prefix: string = 'user';

    constructor(
        private readonly api: ApiService
    ) {
    }

    getList(request: UserGetListRequest): Observable<Page<AdminUserVm>> {
        return this.api.post(this.prefix + '/list', request);
    }

    getById(id: string): Observable<UserEditModel> {
        return this.api.get(this.prefix + '/' + id);
    }

    save(request: UserEditModel): Observable<UserEditModel> {
        return this.api.post(this.prefix, request);
    }

    delete(id: string): Observable<void> {
        return this.api.delete(this.prefix + '/' + id);
    }
}
