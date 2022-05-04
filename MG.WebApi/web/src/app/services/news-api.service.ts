import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {NewsVm} from '../models/news/news-vm';
import {NewsBlock, NewsDetailsVm} from '../pages/news-page/news-details/news-details.component';
import {map} from 'rxjs/operators';

@Injectable()
export class NewsApiService {

  protected readonly baseUrl = 'news';

  constructor(protected readonly api: ApiService) { }

  getNewsList(): Observable<NewsVm[]> {
    return this.api.get(this.baseUrl);
  }

  getNewsDetails(id: string): Observable<NewsDetailsVm> {
    return this.api.get<any>(this.baseUrl + `/${id}`)
      .pipe(
        map(details => {
          if (details.blocks)
            details.blocks = JSON.parse(details.blocks) as NewsBlock[];
          return details as NewsDetailsVm;
        })
      );
  }
}
