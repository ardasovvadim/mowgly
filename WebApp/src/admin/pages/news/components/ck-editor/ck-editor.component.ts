import {Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";
import {CKEditor5} from "@ckeditor/ckeditor5-angular/ckeditor";
import {UserService} from "../../../../../app/services/user.service";
import {AuthenticationService} from "../../../../../app/services/authentication.service";
import {environment} from "../../../../../environments/environment";

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
    encapsulation: ViewEncapsulation.None,
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ]
})
export class CkEditorComponent implements OnInit, ControlValueAccessor {

    @ViewChild('editor') editorComponent: CKEditorComponent;
    @Input() data = '<p>Hello, world!</p>';
    @Input() set extraConfig(value: CKEditor5.Config) {
        this.config = Object.assign(this.config, value);
    }

    public Editor = Editor;
    onChangeCallback: any = noop;
    onTouchCallback: any = noop;
    disabled: boolean = false;
    config: CKEditor5.Config = {
        simpleUpload: {
            uploadUrl: '/api/image/news',
            headers: {
                Authorization: `Bearer ${this.authenticationService.getToken()}`
            }
        }
    };

    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {
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
        this.onChangeCallback(this.data);
    }
}
