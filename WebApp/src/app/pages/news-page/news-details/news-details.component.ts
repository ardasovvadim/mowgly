import {Component, OnInit} from '@angular/core';
import {NewsVm} from '../../../models/news/news-vm';
import {IdName} from '../../../models/timetable-records/timetable-record.view.model';
import {NewsApiService} from '../../../services/news-api.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'mg-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  providers: [
    NewsApiService
  ]
})
export class NewsDetailsComponent implements OnInit {

  data: NewsDetailsVm;
  blockTypes = NewsBlockType;
  newsNotFound = false;

  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if (!id) {
          this.newsNotFound = true;
          return of(null);
        }

        return this.newsApiService.getNewsDetails(id);
      })
    ).subscribe(
      data => {
        if (data)
          this.data = data;
      },
      _ => this.newsNotFound = true);

  }

}

export interface NewsDetailsVm extends NewsVm {
  authorAvatar: string;
  authorId?: string;
  blocks: NewsBlock[];
}

export enum NewsBlockType {
  None = 0,
  Text,
  Video,
  Image,
  TournamentResultsTable
}

export interface NewsBlock {
  order: number;
  type: NewsBlockType;
  data: string;
}

export interface NewsImageBlock {
  url: string;
  caption: string;
}

export interface TournamentEditModel {
  id: string;
  name: string;
  actionDate: string;
}

export interface TournamentResultsData extends TournamentEditModel {
  results: TournamentResult[];
}

export interface TournamentResult {
  id: string;
  student: IdName;
  place: string;
  score: string;
  additionalInfo: string;
  awards: string;
}
