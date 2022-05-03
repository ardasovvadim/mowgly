import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'mg-manage-text-line',
  templateUrl: './manage-text-line.component.html',
  styleUrls: ['./manage-text-line.component.scss']
})
export class ManageTextLineComponent implements ControlValueAccessor {

  @Input() styleClass: string;
  text: string = 'Заголовок';

  constructor() { }

  ngOnInit(): void {
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {
    if (obj) {
      this.text = obj;
    }
  }

}
