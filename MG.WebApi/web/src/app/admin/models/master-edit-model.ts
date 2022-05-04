import {GeneralSettingVm} from '../../models/general-setting.view.model';

// export class MasterEditModel {
//   public id: string = '';
//   public firstName: string = '';
//   public lastName: string = '';
//   public middleName: string = '';
//   public birthday: string = '';
//   public email: string = '';
//   public phone: string = '';
//   public profiles: GeneralSettingVm[] = [];
// }

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
  cardMasterAvatarImage: string;
  profiles: GeneralSettingVm[];
}
