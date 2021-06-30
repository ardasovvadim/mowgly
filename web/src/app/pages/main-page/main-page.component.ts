import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mg-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  imgPaths: string[] = [
    'assets/img/photo-1.png',
    'assets/img/photo-2.png',
    'assets/img/photo-3.png',
  ]

  constructor() {

  }

  ngOnInit(): void {
  }

}
