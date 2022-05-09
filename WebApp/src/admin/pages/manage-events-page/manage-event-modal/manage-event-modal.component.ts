import {Component} from '@angular/core';
import {ManageModal} from '../../../components/manage-modal/manage-modal';
import {ManageEventsApiService} from '../../../services/manage-events-api.service';
import {EventVm} from '../../../../app/models/events/event-vm';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'mg-manage-event-modal',
  templateUrl: './manage-event-modal.component.html',
  styleUrls: ['./manage-event-modal.component.scss']
})
export class ManageEventModalComponent extends ManageModal {

  form: FormGroup = this.fb.group({
    'id': [null],
    'tournamentName': [''],
    'actionDate': [''],
    'address': [''],
    'googleMapLink': [''],
    'participants': [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly manageApiService: ManageEventsApiService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  close() {
    this.onSubmittedAndClosed.emit();
    super.close();
  }

  submit() {
    this.manageApiService.add(this.form.value)
      .subscribe(_ => {
        this.onSubmittedAndClosed.emit();
        super.close();
      })
  }

  manageEvent(data: EventVm) {
    this.form.reset({...data, actionDate: moment(data.actionDate).format('YYYY-MM-DD')}, {emitEvent: false});
    this.open();
  }

  delete() {
    this.manageApiService.delete(this.form.value.id)
      .subscribe(_ => {
        this.close();
      });
  }
}
