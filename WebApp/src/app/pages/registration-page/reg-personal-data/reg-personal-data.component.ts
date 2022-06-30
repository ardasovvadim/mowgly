import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PersonalDataModel} from '../../../models/registration/personal-data.model';
import {delay, finalize, of} from 'rxjs';

@Component({
  selector: 'mg-reg-personal-data',
  templateUrl: './reg-personal-data.component.html',
  styleUrls: ['./reg-personal-data.component.scss']
})
export class RegPersonalDataComponent implements OnInit {

  @Output() onSubmit: EventEmitter<PersonalDataModel> = new EventEmitter<PersonalDataModel>();

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    email: [''],
    phoneNumber: ['', [Validators.required]],
    isParent: [false]
  });
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  hasError(control: string, error: string): boolean {
    return this.formSubmitted && this.form.controls[control]?.hasError(error)
  }

  submit() {
    this.formSubmitted = true;
    if (this.form.invalid)
      return;

    this.onSubmit.emit(this.form.value)
  }
}
