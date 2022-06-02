import {LocationViewModel} from '../../app/models/locations/location.view.model';
import {IdName} from '../../app/models/timetable-records/timetable-record.view.model';
import {FilterPageRequest} from '../../app/models/page-request';

export interface LocationEditModel extends LocationViewModel {
    sections: IdName[];
}

export interface AdminLocalVmRequest extends FilterPageRequest {
    filterCity?: string;
}

export interface AdminLocationVm {
    id: string;
    name: string;
    address: string;
    city: string;
    createdDate: string;
}
