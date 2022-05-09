import {AbstractControl} from '@angular/forms';

// @ts-ignore
FormGroup.prototype.getStringAndTrim = getStringAndTrim;

interface FormGroup extends AbstractControl {
  getStringAndTrim: typeof getStringAndTrim;
}

function getStringAndTrim(this: FormGroup, key: string) {
  const value = this.get(key)?.value as string;
  return value?.trim();
}
