import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mg-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss']
})
export class BgComponent implements OnInit {

  @Input() offset: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
