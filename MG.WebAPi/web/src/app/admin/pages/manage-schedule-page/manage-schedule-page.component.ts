import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  IdName,
  TimetableRecordEditModel,
  TimetableRecordEditModelResponse,
  TimetableRecordVm
} from '../../../models/timetable-records/timetable-record.view.model';
import {TimetableService} from '../../../services/timetable.service';
import {DayOfWeek} from '../../../models/timetable-records/day-of-week';
import * as moment from 'moment';
import {ModalService} from '../../../services/modal.service';
import {ManageTimeslotModalComponent} from './manage-timeslot-modal/manage-timeslot-modal.component';
import {MgOptions, OptionsApiService} from '../../../services/options-api.service';
import {ManageTimetableApiService} from '../../services/manage-timetable-api.service';

@Component({
  selector: 'mg-manage-schedule-page',
  templateUrl: './manage-schedule-page.component.html',
  styleUrls: ['./manage-schedule-page.component.scss'],
  providers: [
    TimetableService,
    ManageTimetableApiService,
    OptionsApiService
  ]
})
export class ManageSchedulePageComponent implements OnInit, OnDestroy {

  get data(): TimetableRecordEditModel[] {
    return this.response?.data;
  }
  dayTimes: string[] = [];

  options: MgOptions;
  cityFilter: string | null = null;
  locationFilter: string | null = null;
  sectionFilter: string | null = null;
  filterText: string | null = null;

  modal: ManageTimeslotModalComponent | null = null;

  readonly dayOfWeek: number[] = [1, 2, 3, 4, 5, 6, 7];

  private readonly subscriptions: Subscription[] = [];
  private response: TimetableRecordEditModelResponse;

  get masters(): IdName[] {
    return this.response?.masters;
  }

  constructor(
    private readonly timetableService: TimetableService,
    private readonly modalService: ModalService,
    private readonly optionsService: OptionsApiService,
    private readonly manageTimetableApiService: ManageTimetableApiService,
    private readonly detector: ChangeDetectorRef
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
    this.initializeModal();

    this.optionsService.getOptions({sections: true, locations: true, cities: true})
      .subscribe(options => this.options = options);
  }

  refreshData(): void {
    this.manageTimetableApiService.getRecords({
      cities: this.passOrDefault(this.cityFilter),
      sectionGuids: this.passOrDefault(this.sectionFilter),
      locationGuids: this.passOrDefault(this.locationFilter),
      filterText: this.filterText
    }).subscribe(data => {
      this.response = data;
    });
  }

  displayTime(timetables: TimetableRecordVm[], day: DayOfWeek) {
    const timetable = timetables?.find(t => t.dayOfWeek == day);
    return timetable != null ? `${timetable.startTime} - ${timetable.endTime}` : '-';
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

  private initializeModal() {
    this.modalService
      .createModal<ManageTimeslotModalComponent>({type: ManageTimeslotModalComponent})
      .subscribe(modal => {
        this.modal = modal;
        if (this.modal != null) {
          // this.modal.sections = this.sections;
          // this.modal.locations = this.locations;

          const sub = this.modal.onSubmittedAndClosed.subscribe(_ =>
            console.log('')
            // this.refreshLocations()
          );
          this.subscriptions.push(sub);
          this.modal.close()
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.modal && this.modalService.deleteModal(this.modal);
  }

  addTimeslot(day: number = 0, dayTime: string | null = null) {
    let startTime = '';
    let endTime = '';

    if (dayTime != null) {
      startTime = dayTime;
      endTime = moment(dayTime, 'HH:mm').add(30, 'minutes').format('HH:mm');
    }

    if (this.modal) {
      this.modal.showTimeslot({
        dayOfWeek: day,
        startTime,
        endTime
      } as TimetableRecordEditModel, false);
    }
  }

  editTimeslot(timeslot: TimetableRecordEditModel) {
    if (this.modal) {
      this.modal.showTimeslot(timeslot, true);
    }
  }

  refresh() {

  }

  private passOrDefault(filter: string): string[] {
    return filter ? [filter] : [];
  }
}
