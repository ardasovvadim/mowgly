import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NewsApiService} from '../../app/services/news-api.service';
import {ApiService} from '../../app/services/api.service';
import {NewsDetailsVm} from '../../app/pages/news-page/news-details/news-details.component';

@Injectable()
export class ManageNewsApiService extends NewsApiService {

  constructor(api: ApiService) {
    super(api);
  }

  addNews(data: NewsDetailsVm): Observable<NewsDetailsVm> {
    return this.api.post(this.baseUrl, {...data, blocks: JSON.stringify(data.blocks)});
  }

}
