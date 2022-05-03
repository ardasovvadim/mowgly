import {environment} from '../../environments/environment';
import {GeneralSettingVm} from '../models/general-setting.view.model';
import {UiKit} from './ui-kit';

export abstract class Indexer {
  private static id: number = 0;
  public static getId = (): number => (++Indexer.id);
}

declare global {
  interface String {
    format(...replacements: string[]): string;
  }
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

export {}

export function goToExternalLink(link: string) {
  window.open(link, "_blank");
}

const guidRegex: RegExp = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/;

export function isGuid(str: string): boolean {
  return str != null && str.length > 0 && guidRegex.test(str);
}

export function getImageUrl(guid: string): string {
  return `${environment.baseApiLinks}/image/${guid}`;
}

export function parseImage(strValue: string) {
  return isGuid(strValue) ? getImageUrl(strValue) : strValue;
}

export function scrollTo(id: string, offset: number | null = null) {
  const options = offset == null ? {} : {offset};
  const scrollId = `#${id}`;
  UiKit.scroll(scrollId, options)?.scrollTo(scrollId);
}
