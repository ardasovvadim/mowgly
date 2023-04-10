import {Component, OnInit} from '@angular/core';
import UIkit from "uikit";
import image = UIkit.image;
import {NewsVm} from "../../../../models/news/news-vm";
import {NewsApiService} from "../../../../services/news-api.service";

@Component({
    selector: 'mg-news-feed',
    templateUrl: './news-feed.component.html',
    styleUrls: ['./news-feed.component.scss'],
    providers: [
        NewsApiService
    ]
})
export class NewsFeedComponent implements OnInit {

    data: NewsVm[];

    constructor(
        private readonly newsApiService: NewsApiService
    ) {
    }

    ngOnInit(): void {
        this.newsApiService.getNewsList()
            .subscribe(data => this.data = data);
    }
}
