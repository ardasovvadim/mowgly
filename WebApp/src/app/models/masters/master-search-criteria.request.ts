import {PageRequest} from '../page-request';

export interface MasterSearchCriteria extends PageRequest {
  sectionIds: string[];
  locationIds: string[];
}
