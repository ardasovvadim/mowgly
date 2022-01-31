import {GeneralSettingVm} from '../general-setting.view.model';
import {SectionSettingKeys} from './section-setting-keys';

export class SectionVm {
  id: string = '';
  name: string = '';
  settings: GeneralSettingVm[] = [];
}
