import { Pipe, PipeTransform } from '@angular/core';
import {parseImage} from '../../utils/utils';
import {GeneralSettingVm} from '../../models/general-setting.view.model';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): unknown {
    return parseImage(value);
  }

}
