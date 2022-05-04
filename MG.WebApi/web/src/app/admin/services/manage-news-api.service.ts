import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {NewsDetailsVm} from '../../pages/news-page/news-details/news-details.component';
import {Observable} from 'rxjs';
import {NewsApiService} from '../../services/news-api.service';

@Injectable()
export class ManageNewsApiService extends NewsApiService {

  constructor(api: ApiService) {
    super(api);
  }

  addNews(data: NewsDetailsVm): Observable<NewsDetailsVm> {
    return this.api.post(this.baseUrl, {...data, blocks: JSON.stringify(data.blocks)});
  }

}
