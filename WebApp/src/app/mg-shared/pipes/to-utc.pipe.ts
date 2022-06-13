import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUtc'
})
export class ToUtcPipe implements PipeTransform {

  transform(value: string): string {
    return value + 'Z';
  }

}
