import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  AdminTimetableRecordsResponse,
  IdName,
  TimetableRecordEditModel,
  TimetableRecordVm
} from '../../../app/models/timetable-records/timetable-record.view.model';
import {DayOfWeek} from '../../../app/models/timetable-records/day-of-week';
import * as moment from 'moment';
import {ManageTimeslotModalComponent} from './components/manage-timeslot-modal/manage-timeslot-modal.component';
import {MgOptions, OptionsApiService} from '../../../app/services/options-api.service';
import {ManageTimetableApiService} from '../../services/manage-timetable-api.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {finalize, of} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'mg-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [
    ManageTimetableApiService,
    OptionsApiService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit, AfterViewInit {

  get data(): TimetableRecordEditModel[] {
    return this.response?.data;
  }

  dayTimes: string[] = [];

  options: MgOptions;
  cityFilter: string | null = null;
  locationFilter: string | null = null;
  sectionFilter: string | null = null;
  filterText: string | null = null;

  @ViewChild('manageModal') modal: ManageTimeslotModalComponent;

  readonly dayOfWeek: number[] = [1, 2, 3, 4, 5, 6, 7];

  private response: AdminTimetableRecordsResponse;

  get masters(): IdName[] {
    return this.response?.masters;
  }

  constructor(
      private readonly timetableService: ManageTimetableApiService,
      private readonly optionsService: OptionsApiService,
      private readonly cdr: ChangeDetectorRef
  ) {
    new Array(24).fill(0).forEach((_, i) => {
      if (i >= 7 && i <= 21) {
        this.dayTimes.push(moment({hour: i}).format('HH:mm'));
        this.dayTimes.push(moment({hour: i, minute: 30}).format('HH:mm'));
      }
    })
  }

  ngOnInit(): void {
    this.refreshData();
  }

  loading: boolean = false;

  refreshData(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.timetableService.getTimeTableRecords({
      city: this.cityFilter,
      sectionId: this.sectionFilter,
      locationId: this.locationFilter,
      filterText: this.filterText
    })
        .pipe(
            finalize(() => {
              this.loading = false;
              this.cdr.detectChanges();
            }),
        )
        .subscribe(data => {
          this.response = data;
          this.cdr.detectChanges();
        });
  }

  displayTime(timetables: TimetableRecordVm[], day: DayOfWeek) {
    const timetable = timetables?.find(t => t.dayOfWeek == day);
    return timetable != null ? `${timetable.startTime} - ${timetable.endTime}` : '-';
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

  addTimeslot(day: number = 0, dayTime: string | null = null) {
    let startTime = '';
    let endTime = '';

    if (dayTime != null) {
      startTime = dayTime;
      endTime = moment(dayTime, 'HH:mm').add(30, 'minutes').format('HH:mm');
    }

    this.modal.showTimeslot({
      dayOfWeek: day,
      startTime,
      endTime
    } as TimetableRecordEditModel);
    this.cdr.detectChanges();
  }

  editTimeslot(timeslot: TimetableRecordEditModel) {
    const masterName = this.response.masters.find(m => m.id == timeslot.masterId)?.name;
    this.modal.showTimeslot({...timeslot, masterId: {id: timeslot.masterId, name: masterName}});
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.optionsService.getOptions({sections: true, locations: true, cities: true, locationSections: true})
        .pipe(
            tap(data => {
              this.modal.locationSections = data.locations2;
            })
        )
        .subscribe(options => {
          this.options = options;
          this.cdr.detectChanges();
        });

    this.modal.onSubmitted
        .pipe(
            untilDestroyed(this),
            switchMap(_ => {
              const form = this.modal.form

              if (!form.valid)
                return of(null)

              return this.timetableService.addTimetableRecordAsync({
                ...form.value,
                masterId: form.value.masterId?.id
              });
            }),
            filter(response => response != null)
        )
        .subscribe(_ => {
          this.modal.close();
          this.refreshData();
        });

    this.modal.onDeleted
        .pipe(
            untilDestroyed(this),
            map(() => this.modal.form.value.id),
            filter(id => !!id),
            switchMap(id => this.timetableService.delete(id))
        )
        .subscribe(() => {
          this.modal.close();
          this.refreshData();
        })
  }

}
