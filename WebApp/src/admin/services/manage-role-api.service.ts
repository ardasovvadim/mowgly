import {Injectable} from '@angular/core';
import {ApiService} from '../../app/services/api.service';
import {Observable} from 'rxjs';
import {GetRolesResponse, RoleDto} from '../models/role.model';

@Injectable()
export class ManageRoleApiService {

    readonly servicePrefix = 'role'

    constructor(
        private readonly api: ApiService
    ) {
    }


    get(): Observable<GetRolesResponse> {
        return this.api.get(this.servicePrefix);
    }


    save(request: RoleDto[]): Observable<void> {
        return this.api.post(this.servicePrefix, { roles: request });
    }
}
