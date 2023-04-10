import { Pipe, PipeTransform } from '@angular/core';
import {NewsBlockType} from "../../../../app/models/news/news-vm";

@Pipe({
  name: 'unsupportedType'
})
export class UnsupportedTypePipe implements PipeTransform {

  supportedTypes = [
    NewsBlockType.Text,
    NewsBlockType.TournamentResultsTable,
  ];

  transform(value: NewsBlockType): boolean {
    return !this.supportedTypes.includes(value);
  }

}
