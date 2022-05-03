import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'mg-manage-news-page',
  templateUrl: './manage-news-page.component.html',
  styleUrls: ['./manage-news-page.component.scss']
})
export class ManageNewsPageComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }


  ngOnInit(): void {
  }

  add() {
    this.router.navigate(['/admin', 'news', 'new']);
  }
}
