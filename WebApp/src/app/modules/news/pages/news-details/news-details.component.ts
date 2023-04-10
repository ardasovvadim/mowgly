import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsApiService} from "../../../../services/news-api.service";
import {map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {NewsBlockType, NewsDetailsVm} from "../../../../models/news/news-vm";

@Component({
  selector: 'mg-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  providers: [
    NewsApiService
  ]
})
export class NewsDetailsComponent implements OnInit {

  news: NewsDetailsVm;
  blockTypes = NewsBlockType;
  newsNotFound = false;
  id?: number = null;
  imageLoadingError = false;

  constructor(
      private readonly newsApiService: NewsApiService,
      private readonly activeRoute: ActivatedRoute
  ) { }

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
    ).subscribe({
      next: data => {
        if (data) {
          this.news = data;
        }
      },
      error: _ => this.newsNotFound = true
    });

  }

}
