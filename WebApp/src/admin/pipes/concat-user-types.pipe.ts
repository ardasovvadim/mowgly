import { Pipe, PipeTransform } from '@angular/core';
import {UserType, userTypes} from '../models/user.model';

@Pipe({
  name: 'concatUserTypes'
})
export class ConcatUserTypesPipe implements PipeTransform {

  transform(types: UserType): String {
    let roles = userTypes.filter(r => (types & r.key) == r.key).map(r => r.value);
    return roles.join(', ');
  }

}
