import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ManageModal} from '../../../components/manage-modal/manage-modal';
import {IdName, TimetableRecordEditModel} from '../../../../app/models/timetable-records/timetable-record.view.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'mg-manage-user-modal',
  templateUrl: './manage-user-modal.component.html',
  styleUrls: ['./manage-user-modal.component.scss']
})
export class ManageUserModalComponent extends ManageModal {

  @Output() onSubmittedAndClosed: EventEmitter<void> = new EventEmitter<void>();

  isEditMode = false;
  timeslot: TimetableRecordEditModel = {} as TimetableRecordEditModel;

  form: FormGroup = this.fb.group({
    id: [''],
    dayOfWeek: [''],
    startTime: [''],
    endTime: [''],
    locationId: [''],
    sectionId: [''],
    masterId: ['']
  });

  dayOfWeek: {key: number, value: string}[] = [
    {key: 1, value: 'Понедельник'},
    {key: 2, value: 'Вторник'},
    {key: 3, value: 'Среда'},
    {key: 4, value: 'Четверг'},
    {key: 5, value: 'Пятница'},
    {key: 6, value: 'Суббота'},
    {key: 7, value: 'Воскресенье'},
  ];

  masters: IdName[] = [
    {id: '1', name: 'Master 1'},
    {id: '2', name: 'Master 2'},
    {id: '3', name: 'Master 3'},
    {id: '4', name: 'Master 4'},
  ];

  locations!: IdName[];
  sections!: IdName[];

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  submit() {
    // this.locationService
    //   .save(this.form.value)
    //   .subscribe(_ => {
    //   });
    this.onSubmittedAndClosed.emit();
    this.close();
  }

  showTimeslot(timeslot: TimetableRecordEditModel, isEditMode: boolean): void {
    this.timeslot = timeslot;
    this.isEditMode = isEditMode;
    this.form.reset(timeslot, {emitEvent: false});
    this.open();
  }

  delete() {
    // this.locationService
    //   .delete(this.timeslot.id)
    //   .subscribe(_ => {
    //     this.submittedAndClosed.emit();
    //     this.close();
    //   });
  }

  cancel() {
    this.close();
  }



}
