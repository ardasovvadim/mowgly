import {Component, Input, OnInit} from '@angular/core';
import {Indexer} from '../../../../utils/utils';
import {NewsImageBlock} from "../../../../models/news/news-vm";

@Component({
  selector: 'mg-news-image-block',
  templateUrl: './news-image-block.component.html',
  styleUrls: ['./news-image-block.component.scss']
})
export class NewsImageBlockComponent implements OnInit {

  @Input() set data(value: string) {
    if (!value)
      return;

    // todo: refactor
    const d = JSON.parse(value) as NewsImageBlock;
    if (!d)
      return;

    this._data = d;
  }

  id = `news-image-${Indexer.getId()}`;

  get image(): NewsImageBlock {
    return this._data;
  }

  private _data: NewsImageBlock;

  constructor() { }

  ngOnInit(): void {
  }

}
