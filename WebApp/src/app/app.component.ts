import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthorizeService} from '../api-authorization/authorize.service';

@Component({
  selector: 'mg-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'WebApp';

  data = {};

  constructor(
      private readonly http: HttpClient,
      private readonly authoriseService: AuthorizeService
  ) {
  }

  ngOnInit(): void {
    this.authoriseService.ensureUserManagerInitialized().then(r => this.authoriseService.userManager.getUser().then(u => console.log(u)));
  }


}
