import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Indexer, toNetDate} from '../../../../../../app/utils/utils';
import {UiKit} from '../../../../../../app/utils/ui-kit';
import {OptionsApiService} from '../../../../../../app/services/options-api.service';
import {Observable} from 'rxjs';
import {IdName} from '../../../../../../app/models/timetable-records/timetable-record.view.model';
import {ManageEventsApiService} from '../../../../../services/manage-events-api.service';
import {
    ManageEventModalComponent
} from '../../../../manage-events-page/manage-event-modal/manage-event-modal.component';
import {EventVm} from '../../../../../../app/models/events/event-vm';
import {
    AutocompleteInputComponent
} from '../../../../../../app/mg-shared/components/autocomplete-input/autocomplete-input.component';

@Component({
    selector: 'mg-choose-or-create-event-modal',
    templateUrl: './choose-or-create-event-modal.component.html',
    styleUrls: ['./choose-or-create-event-modal.component.scss'],
    providers: [
        OptionsApiService,
        ManageEventsApiService
    ]
})
export class ChooseOrCreateEventModalComponent implements OnInit, AfterViewInit {

    id: string = `choose-or-create-event-${Indexer.getId()}`;

    get sid(): string {
        return '#' + this.id;
    }

    modal: any;

    @Output() onCreated: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('eventModal') eventModal: ManageEventModalComponent;
    @ViewChild('eventOptions') eventOptions: AutocompleteInputComponent;

    eventsSource = (filterText: string): Observable<IdName[]> => {
        return this.optionsApiService.getEvents(filterText, this.filterDate ? toNetDate(this.filterDate) : null);
    }
    filterDate: string = null;

    constructor(
        private readonly optionsApiService: OptionsApiService
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.modal = UiKit.modal(this.sid);
    }

    chooseEvent() {
        this.filterDate = null;
        this.eventOptions.writeValue(null);
        this.modal.show()
    }

    createNewEvent() {
        this.modal.hide();
        this.eventModal.manageEvent({} as EventVm);
    }

    addResults(selectedIdName: IdName) {
        if (selectedIdName?.id) {
            this.onCreated.emit(selectedIdName.id);
            this.modal.hide();
        }
    }

    addResultById(event: EventVm) {
        if (event) {
            this.onCreated.emit(event.id);
        }
    }
}
