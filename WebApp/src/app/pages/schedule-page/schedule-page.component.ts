import {Component, OnInit, ViewChild} from '@angular/core';
import {IdName} from '../../models/timetable-records/timetable-record.view.model';
import {
  TimetableRecordTableComponent
} from '../../mg-shared/components/timetable-record-table/timetable-record-table.component';
import {MgOptions, OptionsApiService} from '../../services/options-api.service';

@Component({
  selector: 'mg-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: [
    OptionsApiService
  ]
})
export class SchedulePageComponent implements OnInit {

  @ViewChild('timetable') timetable: TimetableRecordTableComponent;

  data: [] = [];
  filteringCity: string = null;
  filteringLocation: string = null;
  filteringSection: string = null;

  options: MgOptions;

  constructor(
    private readonly optionsService: OptionsApiService
  ) { }

  ngOnInit(): void {
    this.optionsService.getOptions({cities: true, locations: true, sections: true})
      .subscribe(options => this.options = options);
  }

  refreshData() {
    this.timetable.displayTimetableRecords({
      locationId: this.filteringLocation,
      sectionId: this.filteringSection,
      city: this.filteringCity
    })
      .subscribe();
  }

}
