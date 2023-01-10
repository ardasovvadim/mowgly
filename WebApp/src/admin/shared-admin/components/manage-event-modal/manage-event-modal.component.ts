import {Component, EventEmitter, Output} from '@angular/core';
import {ManageModal} from '../manage-modal/manage-modal';
import {ManageEventsApiService} from '../../../services/manage-events-api.service';
import {EventVm} from '../../../../app/models/events/event-vm';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {mgConfirm} from '../../../../app/utils/ui-kit';
import {switchMap, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'mg-manage-event-modal',
    templateUrl: './manage-event-modal.component.html',
    styleUrls: ['./manage-event-modal.component.scss']
})
export class ManageEventModalComponent extends ManageModal {

    get editMode(): boolean {
        return !!this.form?.value?.id
    }

    form: FormGroup = this.fb.group({
        'id': [null],
        'tournamentName': [''],
        'actionDate': [''],
        'address': [''],
        'googleMapLink': [''],
        'participants': [''],
    });

    @Output() eventCreated: EventEmitter<EventVm> = new EventEmitter<EventVm>();
    private valueChanged: boolean = false

    constructor(
        private readonly fb: FormBuilder,
        private readonly manageApiService: ManageEventsApiService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
        super();
    }

    ngOnInit(): void {
    }

    close() {
        this.onSubmittedAndClosed.emit();
        super.close();
    }

    submit() {
        this.manageApiService.add(this.form.value)
            .subscribe(data => {
                this.onSubmittedAndClosed.emit(data.id);
                this.eventCreated.emit(data);
                super.close();
            })
    }

    manageEvent(data: EventVm) {
        this.valueChanged = false;
        this.form.reset({...data, actionDate: moment(data.actionDate).format('YYYY-MM-DD')}, {emitEvent: false});
        this.form.valueChanges.pipe(take(1)).subscribe(() => this.valueChanged = true);
        this.open();
    }

    delete() {
        this.manageApiService.delete(this.form.value.id)
            .subscribe(_ => {
                this.close();
            });
    }

    changeResults() {
        if (this.valueChanged) {
            mgConfirm('Зберігти изменения')
                .pipe(
                    switchMap(() => this.manageApiService.add(this.form.value))
                )
                .subscribe({
                    next: () => {
                        super.close();
                        this.router.navigate([this.form.value.id, 'results'], {relativeTo: this.activatedRoute})
                    },
                    error: () => {  }
                });

            return
        }

        super.close();
        this.router.navigate([this.form.value.id, 'results'], {relativeTo: this.activatedRoute});
    }
}
