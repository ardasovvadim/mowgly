// declare module 'uikit';
import {defer, fromEvent, fromEventPattern, Observable} from 'rxjs';

declare var UIkit: any;
export const UiKit = UIkit;

export function mgNotification(message: string, options: UkNotificationOptions = {} as UkNotificationOptions) {
  if (!options.timeout)
    options.timeout = 3000;

  options.pos = 'bottom-right';

  UiKit.notification(message, options);
}

export function mgConfirm(title: string): Observable<any> {
  return defer(() => UiKit.modal.confirm(title));
}

export function mgSuccessNotification(message: string) {
  UiKit.notification(message, {status: 'primary', pos: 'bottom-right'})
}

export interface UkNotificationOptions {
  status?: 'primary' | 'success' | 'warning' | 'danger';
  timeout?: number;
  pos?: 'bottom-right'
}

export function mgPrompt(name: string, value: string = null): Observable<any> {
  return defer(() => UiKit.modal.prompt(name, value))
}

export function mgOnEvent(id: string, event: string): Observable<any> {
  return fromEventPattern((handler) => UiKit.util.on(id, event, handler));
}
