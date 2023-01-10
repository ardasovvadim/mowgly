import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TournamentResult, TournamentResultsData} from '../../../../app/pages/news-page/news-details/news-details.component';
import {ModalService} from '../../../../app/services/modal.service';
import {
  ManageTournamentResultModalComponent
} from '../manage-tournament-result-modal/manage-tournament-result-modal.component';
import {ManageTournamentApiService} from '../../../services/manage-tournament-api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mg-manage-tournament-table',
  templateUrl: './manage-tournament-table.component.html',
  styleUrls: ['./manage-tournament-table.component.scss'],
  providers: [
    ManageTournamentApiService
  ]
})
export class ManageTournamentTableComponent implements AfterViewInit {

  @Input() set data(value: string) {
    this.tournamentId = value;
    this.refreshData();
  }

  get tournament(): TournamentResultsData {
    return this._data;
  }

  private tournamentId: string;
  private _data: TournamentResultsData;

  @ViewChild('manageModal') manageModal: ManageTournamentResultModalComponent;
  currentRowIndex: number = -1;

  constructor(
    private readonly tournamentService: ManageTournamentApiService
  ) { }

  ngOnInit(): void {
  }

  private refreshData() {
    this.tournamentService.getTournamentById(this.tournamentId)
      .subscribe(data => this._data = data);
  }

  addNewResult() {
    this.manageModal.manageResult(this.tournament, {} as TournamentResult);
  }

  ngAfterViewInit(): void {
    this.manageModal.onSubmittedAndClosed.subscribe(_ => {
      this.refreshData();
    })
  }

  manageTournament(result: TournamentResult) {
    this.manageModal.manageResult(this.tournament, result);
  }
}
