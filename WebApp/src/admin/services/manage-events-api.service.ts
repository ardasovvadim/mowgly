import {Injectable} from '@angular/core';
import {EventsApiService} from '../../app/services/events-api.service';
import {ApiService} from '../../app/services/api.service';
import {EventVm} from '../../app/models/events/event-vm';

@Injectable({
    providedIn: 'root'
})
export class ManageEventsApiService extends EventsApiService {

    constructor(
        protected readonly api: ApiService
    ) {
        super(api);
    }

    add(request: EventVm) {
        return this.api.post(this.baseUrl, request);
    }

    delete(id: string) {
        return this.api.delete(this.baseUrl + `/${id}`);
    }
}
