import { Component, OnInit } from '@angular/core';
import {NewsVm} from '../../models/news/news-vm';
import * as moment from 'moment';
import {NewsApiService} from '../../services/news-api.service';

@Component({
  selector: 'mg-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  providers: [
    NewsApiService
  ]
})
export class NewsPageComponent implements OnInit {

  data: NewsVm[];

  // todo: delete
  private mockData = [
    {
      id: '123',
      title: 'Media Left',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorem dolores in itaque natus necessitatibus non, odit, officia pariatur placeat provident quasi, quis quisquam repellendus similique sunt totam ut voluptas.',
      author: 'Хомутенко Руслан Николаевич',
      createdDate: moment().toISOString(),
      imageUrl: 'https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/ch9ebvae897mcpgvlpxi',
    },
    {
      id: '123',
      title: 'Media Left',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorem dolores in itaque natus necessitatibus non, odit, officia pariatur placeat provident quasi, quis quisquam repellendus similique sunt totam ut voluptas.',
      author: 'Хомутенко Руслан Николаевич',
      createdDate: moment().toISOString(),
      imageUrl: '',
    },
    {
      id: '123',
      title: 'Media Left',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorem dolores in itaque natus necessitatibus non, odit, officia pariatur placeat provident quasi, quis quisquam repellendus similique sunt totam ut voluptas.',
      author: 'Хомутенко Руслан Николаевич',
      createdDate: moment().toISOString(),
      imageUrl: 'https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/ch9ebvae897mcpgvlpxi',
    }
  ];

  constructor(
    private readonly newsApiService: NewsApiService
  ) { }

  ngOnInit(): void {
    this.newsApiService.getNewsList()
      .subscribe(data => this.data = data);
  }

}
