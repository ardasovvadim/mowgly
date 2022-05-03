import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sorted'
})
export class SortedPipe implements PipeTransform {

  transform(array: any[]) {
    if (!array || !array.length)
      return array;

    if (typeof array[0] === 'number')
      return array.sort();

    if (array[0].order)
      return array.sort((el1, el2) => {
        return el1.order > el2.order ? 1 : el1.order == el2.order ? 0 : -1;
      });

    return array;
  }

}
