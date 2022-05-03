import { Pipe, PipeTransform } from '@angular/core';
import {parseImage} from '../../utils/utils';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): unknown {
    return parseImage(value);
  }

}
