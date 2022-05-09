import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TournamentResult, TournamentResultsData} from '../../../app/pages/news-page/news-details/news-details.component';
import {ModalService} from '../../../app/services/modal.service';
import {
  ManageTournamentResultModalComponent
} from '../manage-tournament-result-modal/manage-tournament-result-modal.component';
import {ManageTournamentApiService} from '../../services/manage-tournament-api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mg-manage-tournament-table',
  templateUrl: './manage-tournament-table.component.html',
  styleUrls: ['./manage-tournament-table.component.scss'],
  providers: []
})
export class ManageTournamentTableComponent implements OnInit, OnDestroy {

  @Input() set data(value: string) {
    this.tournamentId = value;
    this.refreshData();
  }

  get tournament(): TournamentResultsData {
    return this._data;
  }

  private tournamentId: string;
  private _data: TournamentResultsData;
  private subscriptions: Subscription[] = [];

  manageModal: ManageTournamentResultModalComponent;

  constructor(
    private readonly modalService: ModalService,
    private readonly tournamentService: ManageTournamentApiService
  ) { }

  ngOnInit(): void {
    this.modalService.createModal<ManageTournamentResultModalComponent>({type: ManageTournamentResultModalComponent})
      .subscribe(modal => {
        if (modal) {
          this.manageModal = modal;

          this.subscriptions.push(this.manageModal.onSubmittedAndClosed.subscribe(_ => {
            this.refreshData();
          }));
        }


      });
  }

  ngOnDestroy(): void {
    if (this.manageModal)
      this.modalService.deleteModal(this.manageModal);

    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private refreshData() {
    this.tournamentService.getTournamentById(this.tournamentId)
      .subscribe(data => this._data = data);
  }

  addNewResult() {
    this.manageModal.manageResult(this.tournament, {} as TournamentResult);
  }
}
