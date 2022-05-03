import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {IdName} from '../../../models/timetable-records/timetable-record.view.model';
import {Indexer} from '../../../utils/utils';
import {UiKit} from '../../../utils/ui-kit';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'mg-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteInputComponent),
      multi: true
    }
  ]
})
export class AutocompleteInputComponent implements OnInit, ControlValueAccessor {

  readonly id = `autocomplete-${Indexer.getId()}`;

  get dropdown(): any {
    return this._dropdown ?? (this._dropdown = UiKit.drop(`#${this.id}`));
  }

  @Input() label = 'Label:'
  @Input() placeholder = 'Placeholder'
  @Output() onRefreshOption: EventEmitter<string> = new EventEmitter<string>();
  @Input() set options(options: IdName[]) {
    this._options = options;
    this.highlightIndex = -1;
    if (options && options.length)
      this.showDropdown();
  }

  get options(): IdName[] {
    return this._options;
  }

  private _dropdown: any;
  filteringName: string;
  selectedIdName: IdName;
  _options: IdName[];
  highlightIndex = -1;

  constructor() { }

  ngOnInit(): void {

  }

  onSelected(option: IdName) {
    this.selectedIdName = option;
    this.filteringName = option.name;
    this.highlightIndex = -1;
    this.options = [];
    this.hideDropdown();
    this.propagateChange(option);
  }

  private showDropdown = () => this.dropdown?.show();

  private hideDropdown = () => this.dropdown?.hide();

  onChange(filteringName: string) {
    if (filteringName && filteringName.length) {
      this.onRefreshOption.emit(filteringName.trim().toLocaleLowerCase());
    }

    if (this.selectedIdName?.name !== filteringName) {
      this.selectedIdName = {
        id: null,
        name: filteringName
      }
      this.propagateChange(this.selectedIdName);
    }
  }

  highlightBelow() {
    if (this.options && this.options.length && this.highlightIndex < this.options.length - 1)
      ++this.highlightIndex;
  }

  highlightAbove() {
    if (this.options && this.options.length && this.highlightIndex > 0)
      --this.highlightIndex;
  }

  selectOption() {
    if (this.options && this.options.length && this.highlightIndex > -1 && this.highlightIndex < this.options.length) {
      this.onSelected(this.options[this.highlightIndex]);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  propagateChange = (_: any) => {};

  writeValue(obj: IdName): void {
    if (obj !== undefined) {
      this.selectedIdName = obj;
      this.filteringName = obj?.name;
    }
  }
}
