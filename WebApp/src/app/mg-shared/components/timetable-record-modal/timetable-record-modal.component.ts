import {Component, ViewChild} from '@angular/core';
import {ModalBase} from '../../../interfaces/modal-base';
import {TRSearchCriteriaRequest} from '../../../models/timetable-records/timetable-record-search-criteria.request';
import {TimetableRecordTableComponent} from '../timetable-record-table/timetable-record-table.component';

@Component({
  selector: 'mg-timetable-record-modal',
  templateUrl: './timetable-record-modal.component.html',
  styleUrls: ['./timetable-record-modal.component.scss']
})
export class TimetableRecordModalComponent extends ModalBase {

  @ViewChild('timetable') timetable: TimetableRecordTableComponent;

  constructor() {
    super();
  }

  displayTimetableRecords(criteria: TRSearchCriteriaRequest): void {
    this.timetable.displayTimetableRecords(criteria)
      .subscribe(() => super.open());
  }


}
