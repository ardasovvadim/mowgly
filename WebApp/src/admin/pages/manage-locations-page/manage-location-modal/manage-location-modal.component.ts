import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalBase} from '../../../../app/interfaces/modal-base';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationViewModel} from '../../../../app/models/locations/location.view.model';
import {LocationEditModel} from '../../../models/location.model';
import {ManageLocationApiService} from '../../../services/manage-location-api.service';
import {OptionsApiService} from '../../../../app/services/options-api.service';
import {IdName} from '../../../../app/models/timetable-records/timetable-record.view.model';
import {
  AutocompleteInputComponent
} from '../../../../app/mg-shared/components/autocomplete-input/autocomplete-input.component';

@Component({
  selector: 'mg-manage-location-modal',
  templateUrl: './manage-location-modal.component.html',
  styleUrls: ['./manage-location-modal.component.scss'],
  providers: [
      OptionsApiService
  ]
})
export class ManageLocationModalComponent extends ModalBase {

  @Output() submittedAndClosed: EventEmitter<void> = new EventEmitter<void>();

  location: LocationViewModel = {} as LocationEditModel;
  form: FormGroup = this.fb.group({
    id: [''],
    name: [''],
    address: [''],
    city: [''],
    googleMapsLink: [''],
    sections: [[]]
  });

  updateSections = (filterText: string) => this.optionsService.getSectionOptions(null, filterText, this.form.value.sections?.map(s => s.id));

  @ViewChild('sectionAutocomplete') sectionAutocomplete: AutocompleteInputComponent;

  constructor(
    private fb: FormBuilder,
    private locationService: ManageLocationApiService,
    private readonly optionsService: OptionsApiService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid)
      return;

    this.locationService
      .save(this.form.value)
      .subscribe(_ => {
        this.submittedAndClosed.emit();
        this.close();
      });
  }

  showLocation(location: LocationEditModel) {
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

  addSection(idName: IdName) {
    if (!idName)
      return

    const control = this.form.get('sections');
    let value = control.value as IdName[];

    if (!value) {
      value = []
      control.setValue(value)
    }

    value.push(idName);
    this.sectionAutocomplete.writeValue(null);
  }

  deleteSection(section: IdName) {
    if (!section)
      return;

    const control = this.form.get('sections');
    let value = control.value as IdName[] ?? [];
    value = value.filter(s => s != section);
    control.setValue(value);
  }
}
