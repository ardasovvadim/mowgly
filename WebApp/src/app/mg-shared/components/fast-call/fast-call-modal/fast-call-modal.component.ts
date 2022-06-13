import {Component, EventEmitter, Output} from '@angular/core';
import {ModalBase} from '../../../../interfaces/modal-base';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderApiService} from '../../../../services/order-api.service';
import {PersonalDataModel} from '../../../../models/registration/personal-data.model';
import {mgSuccessNotification} from '../../../../utils/ui-kit';

@Component({
  selector: 'mg-fast-call-modal',
  templateUrl: './fast-call-modal.component.html',
  styleUrls: ['./fast-call-modal.component.scss'],
  providers: [
      OrderApiService
  ]
})
export class FastCallModalComponent extends ModalBase {

  @Output() onClosed: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup = this.fb.group({
    'name': [''],
    'phone': ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly orderService: OrderApiService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  cancel() {
    this.close();
  }

  submit() {
    if (this.form.invalid)
      return;

    this.orderService.register({
      firstName: this.form.value.name,
      phoneNumber: this.form.value.phone
    } as PersonalDataModel).subscribe(() => {
      this.close();
      this.onClosed.emit();
      mgSuccessNotification(`<span uk-icon="check" class="uk-margin-small-right"></span> Ваш запрос принят`);
    })
  }
}
