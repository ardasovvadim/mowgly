import {PageRequest} from '../page-request';

export class MasterSearchCriteria {
  sectionIds: string[] = [];
  locationIds: string[] = [];
  pageRequest: PageRequest = {
    pageNumber: 1,
    pageSize: 9
  }
}
