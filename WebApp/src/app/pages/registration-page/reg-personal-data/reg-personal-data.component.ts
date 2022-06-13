import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PersonalDataModel} from '../../../models/registration/personal-data.model';

@Component({
  selector: 'mg-reg-personal-data',
  templateUrl: './reg-personal-data.component.html',
  styleUrls: ['./reg-personal-data.component.scss']
})
export class RegPersonalDataComponent implements OnInit {

  @Output() onSubmit: EventEmitter<PersonalDataModel> = new EventEmitter<PersonalDataModel>();

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phoneNumber: [],
    isParent: [false]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
}
