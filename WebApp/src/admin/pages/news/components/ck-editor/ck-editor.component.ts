import {Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CkEditorComponent),
    multi: true
};

@Component({
    selector: 'mg-ck-editor',
    templateUrl: './ck-editor.component.html',
    styleUrls: ['./ck-editor.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CkEditorComponent implements OnInit, ControlValueAccessor {

    @ViewChild('editor') editorComponent: CKEditorComponent;
    @Input() data = '';

    public editor = Editor;
    onChangeCallback: any = noop;
    onTouchCallback: any = noop;
    disabled: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this.data = obj;
    }

    onChange() {
        if (this.editorComponent) {
            this.onChangeCallback(this.editorComponent.data);
        }
    }
}
