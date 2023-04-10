import {Component, Input, OnInit} from '@angular/core';
import {TournamentApiService} from '../../../../services/tournament-api.service';
import {TournamentResultsData} from "../../../../models/news/news-vm";

@Component({
  selector: 'mg-news-tournament-table',
  templateUrl: './news-tournament-table.component.html',
  styleUrls: ['./news-tournament-table.component.scss'],
  providers: [
    TournamentApiService
  ]
})
export class NewsTournamentTableComponent implements OnInit {

  @Input() set data(value: string) {
    if (value) {
      this.tournamentApiService.getTournamentById(value)
        .subscribe(data => this._data = data);
    }
  }

  get tournament(): TournamentResultsData {
    return this._data;
  }

  private _data: TournamentResultsData;

  constructor(
    private readonly tournamentApiService: TournamentApiService
  ) { }

  ngOnInit(): void {
  }

}
