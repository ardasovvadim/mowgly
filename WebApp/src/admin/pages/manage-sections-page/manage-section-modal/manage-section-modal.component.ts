import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ManageSectionApiService} from '../../../services/manage-section-api.service';
import {ProfileMaps} from '../../../models/profile.model';
import {DataType} from '../../../../app/models/data-type';
import {applyProfileMappingToData, applyProfileMappingToForm} from '../../../utils/settings';
import {SectionVm} from '../../../../app/models/sections/section.view.model';
import {UiKit} from '../../../../app/utils/ui-kit';
import {Indexer} from '../../../../app/utils/utils';

@Component({
    selector: 'mg-manage-section-modal',
    templateUrl: './manage-section-modal.component.html',
    styleUrls: ['./manage-section-modal.component.scss'],
    providers: [
        ManageSectionApiService
    ]
})
export class ManageSectionModalComponent implements AfterViewInit {

    readonly id: string = `manage-section-modal-${Indexer.getId()}`;
    get sid(): string {
        return '#' + this.id;
    }
    @Output() onClosed: EventEmitter<void> = new EventEmitter<void>();

    get isEditMode() {
        return this.form.value.id
    }
    form: FormGroup = this.fb.group({
        id: [null],
        name: [''],
        description: [''],
        profiles: [[]],
        mainDescription: [''],
        price: ['']
    });
    modal: any;

    private profileMappings: ProfileMaps = {
        'description': {key: 'CardDescription', type: DataType.Html},
        'mainDescription': {key: 'MainDescription', type: DataType.Html},
        'price': {key: 'Price', type: DataType.String},
    }

    constructor(
        private fb: FormBuilder,
        private readonly sectionApi: ManageSectionApiService
    ) {
    }

    ngOnInit(): void {
    }

    submit() {
        if (this.form.invalid)
            return;

        const request = {...this.form.value};
        applyProfileMappingToData(this.profileMappings, request)
        this.sectionApi.update(this.form.value)
            .subscribe(_ => {
                this.onClosed.emit();
                this.modal.hide();
            });
    }

    show(data: SectionVm) {
        applyProfileMappingToForm(this.profileMappings, data);
        this.form.reset(data);
        this.modal.show();
    }

    delete() {
        const id = this.form.value.id
        if (!id)
            return;

        this.sectionApi.delete(id)
            .subscribe(_ => {
                this.onClosed.emit();
                this.modal.hide();
            })
    }

    ngAfterViewInit(): void {
        this.modal = UiKit.modal(this.sid)
    }
}
