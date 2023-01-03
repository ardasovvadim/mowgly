import {Injectable} from '@angular/core';
import {OrderApiService} from '../../app/services/order-api.service';
import {ApiService} from '../../app/services/api.service';
import {Observable} from 'rxjs';
import {GetOrderListRequest, OrderVm} from '../models/order.model';
import {Page} from '../../app/models/page';

@Injectable()
export class ManageOrderApiService extends OrderApiService {

    constructor(
        api: ApiService
    ) {
        super(api);
    }

    getList(request: GetOrderListRequest): Observable<Page<OrderVm>> {
        return this.api.post(this.servicePrefix + '/list', request);
    }

    markAsProcessed(id: string): Observable<void> {
        return this.api.post(this.servicePrefix + '/' + id + '/process', {});
    }

    delete(id) {
        return this.api.delete(this.servicePrefix + '/' + id);
    }
}
