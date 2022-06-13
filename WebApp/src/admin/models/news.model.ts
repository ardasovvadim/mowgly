import {FilterPageRequest} from '../../app/models/page-request';

export interface AdminNewsVm {
    id: string;
    title: string;
    authorName: string;
    publishedDate?: string;
}

export interface AdminGetNewsRequest extends FilterPageRequest {
    publishedDate?: string;
}
