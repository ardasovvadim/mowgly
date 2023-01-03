import {GeneralSettingVm} from '../../app/models/general-setting.view.model';
import {PageRequest} from '../../app/models/page-request';

export interface AdminMasterVm {
  id: string,
  name: string,
  sections: string,
  createdDate: string,
  updatedDate: string;
}

export interface GetMasterListRequest extends PageRequest {
  filterText: string;
  sectionId: string;
}

export interface MasterEditModel {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  email: string;
  phone: string;
  masterDescriptions: string;
  cardMasterAchievements: string;
  UserAvatar: string;
  profiles: GeneralSettingVm[];
}
