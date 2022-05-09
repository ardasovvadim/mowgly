import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'mg-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'WebApp';

  data = {};

  constructor(private readonly http: HttpClient) {
  }

  ngOnInit(): void {
  }


}
