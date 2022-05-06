// declare module 'uikit';
declare var UIkit: any;
export const UiKit = UIkit;

export function displayNotification(message: string, options: UkNotificationOptions = {} as UkNotificationOptions) {
  if (!options.timeout)
    options.timeout = 3000;

  options.pos = 'bottom-right';

  UiKit.notification(message, options);
}

export interface UkNotificationOptions {
  status?: 'primary' | 'success' | 'warning' | 'danger';
  timeout?: number;
  pos?: 'bottom-right'
}
