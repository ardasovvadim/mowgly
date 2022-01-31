import {Component, EventEmitter, Output} from '@angular/core';
import {ModalBase} from '../../../../interfaces/modal-base';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationViewModel} from '../../../../models/locations/location.view.model';
import {LocationService} from '../../../../services/location.service';

@Component({
  selector: 'mg-manage-location-modal',
  templateUrl: './manage-location-modal.component.html',
  styleUrls: ['./manage-location-modal.component.scss']
})
export class ManageLocationModalComponent extends ModalBase {

  @Output() submittedAndClosed: EventEmitter<void> = new EventEmitter<void>();

  location: LocationViewModel = new LocationViewModel();
  form: FormGroup = this.fb.group({
    id: [''],
    name: [''],
    address: [''],
    city: [''],
    googleMapsLink: ['']
  });

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  submit() {
    this.locationService
      .save(this.form.value)
      .subscribe(_ => {
        this.submittedAndClosed.emit();
        this.close();
      });
  }

  showLocation(location: LocationViewModel) {
    this.location = location;
    this.form.reset(location, {emitEvent: false});
    this.open();
  }

  delete() {
    this.locationService
      .delete(this.location.id)
      .subscribe(_ => {
        this.submittedAndClosed.emit();
        this.close();
      });
  }

  cancel() {
    this.close();
  }
}
