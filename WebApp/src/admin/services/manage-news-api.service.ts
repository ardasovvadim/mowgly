import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NewsApiService} from '../../app/services/news-api.service';
import {ApiService} from '../../app/services/api.service';
import {AdminGetNewsRequest, AdminNewsVm} from '../models/news.model';
import {Page} from '../../app/models/page';
import {NewsDetailsVm} from "../../app/models/news/news-vm";

@Injectable()
export class ManageNewsApiService extends NewsApiService {

  constructor(api: ApiService) {
    super(api);
  }

  addNews(data: NewsDetailsVm): Observable<NewsDetailsVm> {
    return this.api.post(this.baseUrl, {...data, blocks: JSON.stringify(data.blocks)});
  }

  deleteNews(id: string) {
    return this.api.delete(this.baseUrl + '/' + id);
  }

  getList(request: AdminGetNewsRequest): Observable<Page<AdminNewsVm>> {
    return this.api.post(this.baseUrl + '/list', request);
  }
}
