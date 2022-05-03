import {DataType} from './data-type';
import {parseImage} from '../utils/utils';

export class GeneralSettingVm {
  id: string = '';
  name: string = '';
  value: string = '';
  dataType: DataType = DataType.None;
}

export function containsSetting(settings: GeneralSettingVm[], key: string) {
  return settings.some(s => s.name == key);
}

export function setOrCreateSetting(settings: GeneralSettingVm[], key: string, value: any, dataType: DataType = DataType.String): GeneralSettingVm | null {
  if (settings == null)
    return null;

  let setting = settings.find(s => s.name == key);
  if (setting == null) {
    setting = new GeneralSettingVm();
    setting.dataType = dataType;
    settings.push(setting);
  }

  setting.value = stringifySettingValue(value, dataType);
  return setting;
}

export function stringifySettingValue(value: any, dataType: DataType): string {
  const stringOrDefault = (v: any): string => {
    const stringV = value as string;
    if (stringV != null)
      return stringV;

    return '';
  };

  switch (dataType) {
    case DataType.Json:
    case DataType.Array: {
      const arrayV = value as any[];
      const objV = value as {};
      if (arrayV != null || objV != null)
        return arrayV != null ? JSON.stringify(arrayV) : JSON.stringify(objV);
      return stringOrDefault(value);
    }
    case DataType.Number: {
      const numberV = value as number;
      if (numberV != null)
        return numberV.toString();
      return stringOrDefault(value);
    }
    case DataType.Html:
    case DataType.Image:
    case DataType.String:
    default:
      return stringOrDefault(value);
  }
}

export function getValueOrDefault(settings: GeneralSettingVm[], key: string): string {
  return settings?.find(s => s.name === key).value ?? '';
}

export function parseValue(setting: GeneralSettingVm): any {
  switch (setting.dataType) {
    case DataType.Json:
    case DataType.Array:
      return !setting.value ? [] : JSON.parse(setting.value);
    case DataType.Number:
      return !setting.value ? 0 : +setting.value;
    case DataType.Image:
      return parseImage(setting?.value);
    case DataType.Html:
    case DataType.String:
    default:
      return setting.value;
  }
}




