import {AfterViewInit, Component, forwardRef, Input} from '@angular/core';
import * as Quill from 'quill';
import {mgPrompt} from '../../../utils/ui-kit';
import {fromEventPattern} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Indexer} from '../../../utils/utils';
import {DividerBlot} from '../../../utils/quill'

@Component({
    selector: 'mg-quill-editor',
    templateUrl: './quill-editor.component.html',
    styleUrls: ['./quill-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => QuillEditorComponent),
            multi: true
        }
    ]
})
export class QuillEditorComponent implements AfterViewInit, ControlValueAccessor {

    readonly id = `mg-quill-editor-${Indexer.getId()}`
    readonly toolbarId = this.id + '-toolbar'
    readonly containerId = this.id + '-container'

    html: any;
    quill: any;
    propagateChange = (_: any) => {};
    disabled: boolean = false;

    @Input() height: number = null;

    @Input() placeholder: string = '';
    @Input() displayToolBar: boolean = true;

    constructor() {
    }

    ngAfterViewInit(): void {
        let quill = new Quill('#' + this.containerId, {
            modules: {
                toolbar: '#' + this.toolbarId
            },
            'formats/divider': DividerBlot,
            placeholder: this.placeholder
        });

        fromEventPattern((handler) => {
            return quill.on('text-change', handler)
        }).subscribe(() => {
            const newValue = this.quill.root.innerHTML;
            this.html = newValue;
            this.propagateChange(newValue);
        })

        this.quill = quill;
        this.writeValueToQuillEditor(this.html);
    }

    // -------------------------

    addLink() {
        mgPrompt('Link').subscribe(value => this.quill.format('link', value))
    }

    insertDivider() {
        let range = this.quill.getSelection(true);
        this.quill.insertText(range.index, '\n', Quill.sources.USER);
        this.quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
        this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
    }

    // -------------------------

    writeValueToQuillEditor(value: any) {
        if (this.quill && this.quill.clipboard) {
            const delta = this.quill.clipboard.convert(value);
            this.quill.setContents(delta, 'silent')
        }
    }

    // -------------------------

    writeValue(obj: any): void {
        this.html = obj;
        this.writeValueToQuillEditor(obj);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void { }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
