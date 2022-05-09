import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IdName} from '../../../models/timetable-records/timetable-record.view.model';
import {Indexer} from '../../../utils/utils';
import {UiKit} from '../../../utils/ui-kit';
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

    readonly id = `autocomplete-${Indexer.getId()}`;

    get dropdown(): any {
        return this._dropdown ?? (this._dropdown = UiKit.drop('#' + this.id));
    }

    @Input() placeholder: string;
    @Input() optionsSource: (filterText: string) => Observable<IdName[]>;

    set options(options: IdName[]) {
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
    disabled: boolean = false;

    ngOnInit(): void {}

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

    private lastSub: Subscription;

    onChange(filteringName: string) {
        if (filteringName && filteringName.length && !this.lastSub) {
            this.lastSub = this.optionsSource(filteringName.trim())
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
        if (obj !== undefined) {
            this.selectedIdName = obj;
            this.filteringName = obj?.name;
        }
    }

    registerOnTouched(fn: any): void {}

    propagateChange = (_: any) => {};
}
