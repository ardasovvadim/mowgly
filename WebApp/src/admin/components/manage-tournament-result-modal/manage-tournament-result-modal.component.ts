import {Component} from '@angular/core';
import {ManageModal} from '../manage-modal/manage-modal';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ManageTournamentApiService} from '../../services/manage-tournament-api.service';
import {
  TournamentResult,
  TournamentResultsData
} from '../../../app/pages/news-page/news-details/news-details.component';
import {IdName} from '../../../app/models/timetable-records/timetable-record.view.model';
import {catchError, Observable} from 'rxjs';
import {mgConfirm} from '../../../app/utils/ui-kit';

@Component({
  selector: 'mg-manage-tournament-result-modal',
  templateUrl: './manage-tournament-result-modal.component.html',
  styleUrls: ['./manage-tournament-result-modal.component.scss'],
  providers: []
})
export class ManageTournamentResultModalComponent extends ManageModal {

  result: TournamentResult;
  tournament: TournamentResultsData;

  form: FormGroup = this.fb.group({
    'id': [null],
    'student': [''],
    'place': [''],
    'score': [''],
    'additionalInfo': [''],
    'awards': ['']
  });

  refreshStudentOptions = (filterText: string): Observable<IdName[]> => {
    return this.tournamentService.getStudents({
      filterText,
      except: this.tournament?.results.map(r => r.student.id)
    });
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly tournamentService: ManageTournamentApiService
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
    if (this.form.invalid)
      return

    const student = this.form.value.student as IdName;

    if (!student.id) {
      mgConfirm('Участник не был найден. Вы уверены что хотите создать нового?')
          .subscribe({
            next: () => this.addResult(),
            error: () => this.open()
          });
      return;
    }

    this.addResult();
  }

  manageResult(tournament: TournamentResultsData, result: TournamentResult) {
    this.tournament = tournament;
    this.result = result;
    this.form.reset(result, {emitEvent: false})
    this.open();
  }

  delete() {
    if (this.result?.id && this.tournament?.id)
      this.tournamentService.deleteResult(this.tournament.id, this.result.id)
        .subscribe(_ => {
          this.onSubmittedAndClosed.emit();
          this.close();
        })
  }

  private addResult() {
    this.tournamentService.addResult(this.tournament?.id, this.form.value)
        .subscribe(_ => {
          this.onSubmittedAndClosed.emit();
          this.close();
        });
  }
}
