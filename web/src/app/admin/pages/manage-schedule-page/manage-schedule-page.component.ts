import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {
  TimetableRecordEditModel,
  TimetableRecordLocationGroupVm,
  TimetableRecordVm
} from '../../../models/timetable-records/timetable-record.view.model';
import {TimetableService} from '../../../services/timetable.service';
import {TRSearchCriteriaRequest} from '../../../models/timetable-records/timetable-record-search-criteria.request';
import {DayOfWeek} from '../../../models/timetable-records/day-of-week';
import {LocationService} from '../../../services/location.service';
import {LocationViewModel} from '../../../models/locations/location.view.model';
import * as moment from 'moment';

@Component({
  selector: 'mg-manage-schedule-page',
  templateUrl: './manage-schedule-page.component.html',
  styleUrls: ['./manage-schedule-page.component.scss'],
  providers: [
    TimetableService
  ]
})
export class ManageSchedulePageComponent implements OnInit {

  $timetableGroups: Observable<TimetableRecordLocationGroupVm[]> | null = null;

  cities: string[] = [];
  originLocations: LocationViewModel[] = [];

  data: TimetableRecordEditModel[] = [
    {
      dayOfWeek: 1,
      startTime: '09:40',
      endTime: '11:25'
    } as TimetableRecordEditModel
  ]

  filteringCity: string | null = null;
  nameFiltering: string | null = null;
  dayTimes: string[] = [];
  readonly dayOfWeek: number[] = [1, 2, 3, 4, 5, 6];

  constructor(
    private readonly timetableService: TimetableService,
    private readonly locationService: LocationService
  ) {
    new Array(24).fill(0).forEach((_, i) => {
      this.dayTimes.push(moment({hour: i}).format('HH:mm'));
      this.dayTimes.push(moment({hour: i, minute: 30}).format('HH:mm'));
    })
  }

  ngOnInit(): void {
    this.refreshData({} as TRSearchCriteriaRequest);
    this.refreshLocations();
  }

  refreshData(criteria: TRSearchCriteriaRequest): void {
    // this.timetableService.getTimeTableRecordEditModels(criteria).subscribe(data => {
    //   data.
    // })
    this.$timetableGroups = this.timetableService.getTimetableRecords(criteria);
  }

  displayTime(timetables: TimetableRecordVm[], day: DayOfWeek) {
    const timetable = timetables?.find(t => t.dayOfWeek == day);
    return timetable != null ? `${timetable.startTime} - ${timetable.endTime}` : '-';
  }

  private refreshLocations() {
    this.locationService
      .getAll()
      .subscribe(locations => {
        this.originLocations = locations;
        this.cities = locations
          .map(l => l.city)
          .filter((v, i, s) => s.indexOf(v) == i)
          .sort();
      });
  }

  save() {

  }

  isBusy(day: number, dayTime: string): boolean {
    return this.data?.some(r => {
      if (r.dayOfWeek != day)
        return false;

      const from = moment(dayTime, 'HH:mm');
      const to = from.clone().add(30, 'minutes');

      const startTime = moment(r.startTime, 'HH:mm');
      const endTime = moment(r.endTime, 'HH:mm');

      return from.isBetween(startTime, endTime, undefined, '[)')
        || to.isBetween(startTime, endTime, undefined, '(]')
    }) ?? false;
  }

  getBusySlot(day: number, dayTime: string): TimetableRecordEditModel {
    // @ts-ignore
    return this.data.find(r => {
      const from = moment(dayTime, 'HH:mm');
      const to = from.clone().add(30, 'minutes');
      const startTime = moment(r.startTime, 'HH:mm');
      return r.dayOfWeek == day && startTime.isBetween(from, to, undefined, '[)');
    })
  }

  isBuildBusySlot(day: number, dayTime: string): boolean {
    return this.data.some(r => {
      const from = moment(dayTime, 'HH:mm');
      const to = from.clone().add(30, 'minutes');
      const startTime = moment(r.startTime, 'HH:mm');
      return r.dayOfWeek == day && startTime.isBetween(from, to, undefined, '[)');
    });
  }
}
