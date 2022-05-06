import {animate, style, transition, trigger} from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('.8s')
    ]),
    transition('* => void', [
      animate('.8s', style({ opacity: 0 }))
    ]),
    transition('* => *', [
      style({ opacity: 0 }),
      animate('.8s', style({ opacity: 1 }))
    ])
  ])


