import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mg-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;
  loaderColor: 'white' | 'green' = 'green';
  loadingBg: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
