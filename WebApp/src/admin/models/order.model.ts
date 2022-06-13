import {FilterPageRequest} from '../../app/models/page-request';

export interface GetOrderListRequest extends FilterPageRequest {
    createdDate: string;
    processed: boolean;
}

export interface OrderVm {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    isParent: boolean;
    createdTime: string;
    processed: boolean;
    location: string;
    section: string;
    master: string;
}
