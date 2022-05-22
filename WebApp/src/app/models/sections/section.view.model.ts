import {GeneralSettingVm, getValueOrDefault} from '../general-setting.view.model';
import {SectionSettingKeys} from './section-setting-keys';

export interface SectionVm {
  id: string;
  name: string;
  profiles: GeneralSettingVm[];
}
