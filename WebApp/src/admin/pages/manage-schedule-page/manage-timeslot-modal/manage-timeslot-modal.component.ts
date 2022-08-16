import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    IdName,
    LocationSectionOptions,
    TimetableRecordEditModel
} from '../../../../app/models/timetable-records/timetable-record.view.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {OptionsApiService} from '../../../../app/services/options-api.service';
import {Observable} from 'rxjs';
import {Indexer} from '../../../../app/utils/utils';
import UIkit from 'uikit';
import {UiKit} from '../../../../app/utils/ui-kit';
import UIkitModalElement = UIkit.UIkitModalElement;

@UntilDestroy()
@Component({
    selector: 'mg-manage-timeslot-modal',
    templateUrl: './manage-timeslot-modal.component.html',
    styleUrls: ['./manage-timeslot-modal.component.scss'],
    providers: [],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ManageTimeslotModalComponent implements AfterViewInit {

    @Output() onSubmitted: EventEmitter<TimetableRecordEditModel> = new EventEmitter<TimetableRecordEditModel>();
    @Output() onDeleted: EventEmitter<TimetableRecordEditModel> = new EventEmitter<TimetableRecordEditModel>();

    isEditMode = false;
    timeslot: TimetableRecordEditModel = {} as TimetableRecordEditModel;

    form: FormGroup = this.fb.group({
        id: [null],
        dayOfWeek: ['', [Validators.required]],
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
        locationId: [null, [Validators.required]],
        sectionId: [{value: null, disabled: true}, [Validators.required]],
        masterId: [{value: null, disabled: true}, [Validators.required]],
        group: [null]
    });

    dayOfWeek: { key: number, value: string }[] = [
        {key: 1, value: 'Понедельник'},
        {key: 2, value: 'Вторник'},
        {key: 3, value: 'Среда'},
        {key: 4, value: 'Четверг'},
        {key: 5, value: 'Пятница'},
        {key: 6, value: 'Суббота'},
        {key: 7, value: 'Воскресенье'},
    ];

    masters: IdName[] = [];

    sections: IdName[] = [];
    locationSections: LocationSectionOptions[] = [];
    selectedLocation: LocationSectionOptions | null = null;

    readonly id: string = `manage-timetable-slot-modal-${Indexer.getId()}`;
    get sid(): string { return '#' + this.id }

    constructor(
        private readonly fb: FormBuilder,
        private readonly optionsApiService: OptionsApiService,
    ) {
    }

    ngOnInit(): void {
        this.form.controls['locationId']?.valueChanges
            .pipe(
                untilDestroyed(this)
            )
            .subscribe(value => {
                this.selectedLocation = this.locationSections.find(l => l.id == value);

                if (value == null) {
                    this.form.controls['sectionId']?.disable({emitEvent: false})
                    this.form.controls['masterId']?.disable({emitEvent: false})
                    this.form.get('sectionId')?.setValue(null)
                    this.form.get('masterId')?.setValue(null)
                } else
                    this.form.controls['sectionId']?.enable({emitEvent: false})
            })

        this.form.controls['sectionId']?.valueChanges
            .pipe(
                untilDestroyed(this)
            )
            .subscribe(value => {
                if (value != null) {
                    this.form.controls['masterId']?.enable({emitEvent: false});
                } else {
                    this.form.controls['masterId']?.disable({emitEvent: false})
                    this.form.get('masterId')?.setValue(null);
                }
            })
    }

    submit() {
        this.onSubmitted.emit();
    }

    showTimeslot(timeslot: any): void {
        this.isEditMode = !!timeslot.id;
        this.timeslot = timeslot;
        this.form.reset(timeslot);
        this.modal.show();
    }

    delete() {
        this.onDeleted.emit(this.form.value);
    }

    close() {
        this.modal.hide();
    }

    refreshMasterOptions(): (string) => Observable<IdName[]> {
        const other = this
        return (text: string) => other.optionsApiService.getMasterOptions(text);
    }

    private modal: UIkitModalElement;

    ngAfterViewInit(): void {
        this.modal = UiKit.modal(this.sid)
    }
}
