import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageTournamentApiService} from '../../services/manage-tournament-api.service';

@Component({
  selector: 'mg-manage-tournament-results-page',
  templateUrl: './manage-tournament-results-page.component.html',
  styleUrls: ['./manage-tournament-results-page.component.scss'],
  providers: [
    ManageTournamentApiService
  ]
})
export class ManageTournamentResultsPageComponent implements OnInit {

  tournamentId: string = '';

  constructor(
      private readonly activatedRoute: ActivatedRoute,
      private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
       this.tournamentId = params['id']
    })
  }

  back() {
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute})
  }
}
