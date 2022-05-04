import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalBase} from '../../../../interfaces/modal-base';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FastCallData} from '../fast-call-data';

@Component({
  selector: 'mg-fast-call-modal',
  templateUrl: './fast-call-modal.component.html',
  styleUrls: ['./fast-call-modal.component.scss']
})
export class FastCallModalComponent extends ModalBase {

  @Output() onClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmitted: EventEmitter<FastCallData> = new EventEmitter<FastCallData>();
  form: FormGroup = this.fb.group({
    'name': [''],
    'phone': ['']
  });

  constructor(
    private readonly fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
  }

  cancel() {
    this.close();
    this.onClosed.emit();
  }

  submit() {
    this.onSubmitted.emit(this.form.value);
  }
}
