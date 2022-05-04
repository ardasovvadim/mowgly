import { Pipe, PipeTransform } from '@angular/core';
import {GeneralSettingVm} from '../../models/general-setting.view.model';

@Pipe({
  name: 'containsSetting'
})
export class ContainsSettingPipe implements PipeTransform {

  transform(settings: GeneralSettingVm[], key: string): boolean {
    return settings?.some(s => s.name == key) ?? false;
  }

}
