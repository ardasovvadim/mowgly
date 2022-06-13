import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mg-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent implements OnInit {

  @Input() errorHtml: string;

  constructor() { }

  ngOnInit(): void {
  }

}
