import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

import {TournamentResultsData} from "../models/news/news-vm";

@Injectable()
export class TournamentApiService {

  protected readonly serviceUrl = 'tournament'

  constructor(
    protected readonly api: ApiService
  ) { }

  getTournamentById(id: string): Observable<TournamentResultsData> {
    return this.api.get<TournamentResultsData>(this.serviceUrl + `/${id}`);
  }

}
