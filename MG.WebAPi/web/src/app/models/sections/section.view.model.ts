import {GeneralSettingVm, getValueOrDefault} from '../general-setting.view.model';
import {SectionSettingKeys} from './section-setting-keys';

export interface SectionVm {
  id: string;
  name: string;
  settings: GeneralSettingVm[];
}

export interface SectionEditModel {
  id: string;
  name: string;
  cardHeader: string;
  cardDescription: string;
  cardOrder: string;
  cardColumn: string;
}

export function translate(obj: SectionVm): SectionEditModel {
  return {
    id: obj?.id ?? '',
    name: obj?.name ?? '',
    cardHeader: getValueOrDefault(obj.settings, 'CardHeader'),
    cardDescription: getValueOrDefault(obj.settings, 'CardHeader'),
    cardOrder: getValueOrDefault(obj.settings, 'CardHeader'),
    cardColumn: getValueOrDefault(obj.settings, 'CardHeader')
  };
}
