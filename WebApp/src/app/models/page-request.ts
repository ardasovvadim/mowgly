import {SortOrder} from '../services/events-api.service';

export interface PageRequest {
  pageNumber: number;
  pageSize: number
  sort?: string;
  sortOrder?: SortOrder;
}

export interface FilterPageRequest extends PageRequest {
  filterText?: string;
}
