import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fio'
})
export class FioPipe implements PipeTransform {

  transform(user: any): string {
    let result = '';

    if (!user)
      return result;
    if (user.firstName)
      result += user.firstName;
    if (user.lastName)
      result += " " + user.lastName;
    if (user.middleName)
      result += " " + user.middleName;

    return result;
  }

}
