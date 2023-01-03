import {FormGroup} from '@angular/forms';

export function formHasError(submitted: boolean, form: FormGroup, name: string, error: string): boolean {
    return submitted && form.controls[name].hasError(error)
}
