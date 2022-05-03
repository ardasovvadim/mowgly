import { Component, OnInit } from '@angular/core';
import {
  TournamentEditModel,
  TournamentResult,
  TournamentResultsData
} from '../../../pages/news-page/news-details/news-details.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ManageModal} from '../manage-modal/manage-modal';
import {ManageTournamentApiService} from '../../services/manage-tournament-api.service';
import * as moment from 'moment';
import {NewsManageService} from '../../services/news-manage.service';

@Component({
  selector: 'mg-manage-tournament-modal',
  templateUrl: './manage-tournament-modal.component.html',
  styleUrls: ['./manage-tournament-modal.component.scss'],
  providers: []
})
export class ManageTournamentModalComponent extends ManageModal {

  tournament: TournamentEditModel;

  form: FormGroup = this.fb.group({
    'name': [''],
    'actionDate': ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly tournamentService: ManageTournamentApiService,
    // private readonly newsService: NewsManageService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  cancel() {
    this.onSubmittedAndClosed.emit(null);
    this.close();
  }

  submit() {
    this.tournamentService.addTournament({...this.form.value, id: this.tournament?.id})
      .subscribe(data => {
          this.onSubmittedAndClosed.emit(data);
          this.close();
      });
  }

  manageTournament(result: TournamentEditModel) {
    this.tournament = result;
    if (this.tournament.actionDate) {
      this.tournament.actionDate = moment(this.tournament.actionDate).format('YYYY-MM-DD');
    }
    this.form.reset(result, {emitEvent: false})
    this.open();
  }

  delete() {
    if (!this.tournament?.id)
      this.close();

    this.tournamentService.deleteTournament(this.tournament.id)
      .subscribe(_ => {
        // this.newsService.deleteBlockByTournamentId(this.tournament.id);
        this.onSubmittedAndClosed.emit();
        this.close();
      });
  }

}
