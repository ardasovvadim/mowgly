import {FilterPageRequest} from '../page-request';

export interface MasterSearchCriteria extends FilterPageRequest {
  sectionIds: string[];
  locationIds: string[];
  section: string;
  city: string;
}
