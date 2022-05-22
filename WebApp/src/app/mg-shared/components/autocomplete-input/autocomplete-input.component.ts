import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {IdName} from '../../../models/timetable-records/timetable-record.view.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

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

    @Input() placeholder: string = '';
    @Input() optionsSource: (filterText: string) => Observable<IdName[]>;
    @Output() onOptionSelected: EventEmitter<IdName> = new EventEmitter<IdName>();

    set options(options: IdName[]) {
        this._options = options;
        this.highlightIndex = -1;
        if (options && options.length)
            this.displayOptions = true;
    }

    get options(): IdName[] {
        return this._options;
    }

    filteringName: string;
    selectedIdName: IdName;
    _options: IdName[];
    highlightIndex = -1;
    disabled: boolean = false;
    displayOptions: boolean = false;
    isOptionsFocused: boolean = false;

    ngOnInit(): void {}

    onSelected(option: IdName) {
        this.selectedIdName = option;
        this.filteringName = option.name;
        this.options = [];
        this.displayOptions = false;
        this.propagateChange(option);
        this.onOptionSelected.emit(option);
    }

    private lastSub: Subscription;

    onChange(filteringName: string) {
        filteringName = filteringName?.trim()

        if (filteringName && filteringName.length && !this.lastSub) {
            this.lastSub = this.optionsSource(filteringName)
                .subscribe(options => {
                    this.options = options;
                    this.lastSub = null;
                });
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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: IdName): void {
        this.selectedIdName = obj ?? null;
        this.filteringName = obj?.name ?? '';
    }

    registerOnTouched(fn: any): void {}

    propagateChange = (_: any) => {};

    inputFocusOut() {
        if (!this.isOptionsFocused)
            this.displayOptions = false;
    }
}
