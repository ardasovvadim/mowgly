import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {delay, timer} from 'rxjs';
import * as moment from 'moment';
import {FastCallModalComponent} from './fast-call-modal/fast-call-modal.component';

@Component({
    selector: 'mg-fast-call',
    templateUrl: './fast-call.component.html',
    styleUrls: ['./fast-call.component.scss']
})
export class FastCallComponent implements OnInit, AfterViewInit {

    @ViewChild('modal') modal: FastCallModalComponent;
    isDisplayed = false;

    private readonly displayAfterSeconds = 10 * 1000;
    private readonly repeatAfterDays = 1;
    private readonly key = 'fast-call';

    constructor(
        private readonly storage: StorageService,
    ) {
    }

    ngOnInit(): void {
    }

    showModal() {
        this.modal?.open();
    }

    onClose() {
        this.logTime();
        this.isDisplayed = false;
    }

    private logTime() {
        const lastDisplayedTime = moment().toString();
        this.storage.set(this.key, lastDisplayedTime);
    }

    ngAfterViewInit(): void {
        const lastDisplayedTime = this.storage.get<string>(this.key);

        if (!lastDisplayedTime) {

            this.open();
            return;
        }

        const result = moment(lastDisplayedTime).diff(moment(), 'days');
        if (result >= this.repeatAfterDays)
            this.open();
    }

    private open() {
        timer(this.displayAfterSeconds).subscribe(() => {
            this.isDisplayed = true;
        });
    }
}
