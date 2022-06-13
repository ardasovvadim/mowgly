import {Pipe, PipeTransform} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Pipe({
  name: 'hasError',
  pure: false
})
export class HasErrorPipe implements PipeTransform {

  transform(form: FormGroup, name: string, error: string, submitted: boolean): boolean {
    return submitted && form.controls[name].hasError(error)
  }

}
