import {GeneralSettingVm} from '../../models/general-setting.view.model';

export class MasterEditModel {
  public id: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public middleName: string = '';
  public birthday: string = '';
  public email: string = '';
  public phone: string = '';
  public profiles: GeneralSettingVm[] = [];
}
