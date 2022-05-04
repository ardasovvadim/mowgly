import {Component, Injector} from '@angular/core';
import {ManageModal} from '../../../components/manage-modal/manage-modal';
import {ManageEventsApiService} from '../../../services/manage-events-api.service';
import {EventVm} from '../../../../models/events/event-vm';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'mg-manage-event-modal',
  templateUrl: './manage-event-modal.component.html',
  styleUrls: ['./manage-event-modal.component.scss']
})
export class ManageEventModalComponent extends ManageModal {

  data: EventVm;

  form: FormGroup = this.fb.group({
    'tournamentName': [''],
    'actionDate': [''],
    'address': [''],
    'googleLink': [''],
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
    this.manageApiService.add({...this.form.value, id: this.data?.id})
      .subscribe(_ => {
        this.onSubmittedAndClosed.emit();
        super.close();
      })
  }

  manageEvent(data: EventVm) {
    this.data = data;
    if (this.data.actionDate)
      this.data.actionDate = moment(this.data.actionDate).format('YYYY-MM-DD');
    this.form.reset(data, {emitEvent: false});
    this.open();
  }

  delete() {
    this.manageApiService.delete(this.data.id)
      .subscribe(_ => {
        this.close();
      });
  }
}
