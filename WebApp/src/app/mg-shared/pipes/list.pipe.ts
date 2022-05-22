import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: string): any[] {
    return value ? JSON.parse(value) as any[] : [];
  }

}
