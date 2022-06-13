import {environment} from '../../environments/environment';
import {GeneralSettingVm} from '../models/general-setting.view.model';
import {UiKit} from './ui-kit';
import * as moment from 'moment';
import {defer, Observable} from 'rxjs';

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
  // todo
  return `/api/image/${guid}`;
}

export function parseImage(strValue: string) {
  return isGuid(strValue) ? getImageUrl(strValue) : strValue;
}

export function scrollTo(id: string, offset: number | null = null) {
  const options = offset == null ? {} : {offset};
  const scrollId = `#${id}`;
  UiKit.scroll(scrollId, options)?.scrollTo(scrollId);
}

export function toNormalDate(date: string): string {
  return moment(date).format('YYYY-MM-DD')
}

export function readImageAsDataUrl(event: Event, action: (dataUrl: string) => void) {
  const file = (event.target as HTMLInputElement).files[0];
  const fr = new FileReader()
  fr.onload = () => {
    action(fr.result as string)
  }
  fr.readAsDataURL(file);
}

export function toNetDate(date: string) {
  return moment(date).format('YYYY-MM-DD')
}

export function getErrorListHtml(errors: string[]): string {
  return errors
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(it => `<li>${it}</li>`).join('\n');
}
