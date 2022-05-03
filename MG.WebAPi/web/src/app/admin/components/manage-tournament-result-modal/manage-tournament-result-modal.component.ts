import {Component} from '@angular/core';
import {ManageModal} from '../manage-modal/manage-modal';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TournamentResult, TournamentResultsData} from '../../../pages/news-page/news-details/news-details.component';
import {IdName} from '../../../models/timetable-records/timetable-record.view.model';
import {ManageTournamentApiService} from '../../services/manage-tournament-api.service';

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
    'student': [''],
    'place': [''],
    'score': [''],
    'additionalInfo': [''],
    'awards': ['']
  });
  studentOptions: IdName[];

  refreshStudentOptions(filterText: string) {
    this.tournamentService.getStudents({
      filterText,
      except: this.tournament?.results.map(r => r.student.id)
    })
      .subscribe(options => this.studentOptions = options);
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
    this.tournamentService.addResult(this.tournament?.id, {...this.form.value, id: this.result.id})
      .subscribe(_ => {
        this.onSubmittedAndClosed.emit();
        this.close();
      });
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
}
