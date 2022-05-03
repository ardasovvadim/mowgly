import {AbstractControl} from '@angular/forms';

declare module '@angular/forms' {
  interface FormGroup extends AbstractControl {
    getStringAndTrim: (key: string) => string;
  }
}
