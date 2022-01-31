import { Pipe, PipeTransform } from '@angular/core';
import {GeneralSettingVm, parseValue} from '../../models/general-setting.view.model';

@Pipe({
  name: 'settingValue'
})
export class SettingValuePipe implements PipeTransform {

  private readonly defaultValue: string = '';

  transform(settings: GeneralSettingVm[], settingKey: string, defaultValue: any = null): any {
    if (settings == null || settings.length == 0 || settingKey == null || settingKey == '')
      return defaultValue != null ? defaultValue : this.defaultValue;

    const setting =  settings.find(s => s.name == settingKey);
    return setting != null
      ? parseValue(setting)
      : defaultValue != null ? defaultValue : this.defaultValue;
  }

}
