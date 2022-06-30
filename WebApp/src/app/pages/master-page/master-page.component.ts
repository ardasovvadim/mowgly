import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {fadeInAnimation} from '../../mg-shared/animations/fadeInAnimation';
import {MasterSearchCriteria} from '../../models/masters/master-search-criteria.request';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../../services/modal.service';
import {
    TimetableRecordModalComponent
} from '../../mg-shared/components/timetable-record-modal/timetable-record-modal.component';
import {Subscription} from 'rxjs';
import {MasterApiService} from '../../services/master-api.service';
import {MasterVm} from '../../models/masterVm';
import {goToExternalLink, scrollTo} from '../../utils/utils';
import {SettingValuePipe} from '../../mg-shared/pipes/setting-value.pipe';

@Component({
    selector: 'mg-master-page',
    templateUrl: './master-page.component.html',
    styleUrls: ['./master-page.component.scss'],
    animations: [fadeInAnimation],
    providers: [
        SettingValuePipe
    ]
})
export class MasterPageComponent implements OnInit, OnDestroy {

    masterId: string = '';
    otherMasters: MasterVm[] = [];
    masterInfo: MasterVm = new MasterVm();
    private timetableModal: TimetableRecordModalComponent | null = null;
    private subscriptions: Subscription[] = [];
    readonly sectionUpId: string = 'section-up';

    constructor(
        private activateRoute: ActivatedRoute,
        private masterService: MasterApiService,
        private modalService: ModalService,
        private readonly settingsPipe: SettingValuePipe
    ) {
        window.scrollTo(0, 0);
        let sub = activateRoute.params.subscribe(params => {
            this.masterId = params['id'];

            masterService
                .getMasterInfo(this.masterId)
                .subscribe(master => {
                    if (this.masterInfo.id != '')
                        scrollTo(this.sectionUpId, -200);
                    this.masterInfo = master;
                });

            masterService
                .getCardMasters({pageSize: 5} as MasterSearchCriteria)
                .subscribe(masters => this.otherMasters = masters?.filter(m => m.id != this.masterId));
        });

        this.subscriptions.push(sub);
    }

    ngOnInit(): void {
        this.modalService
            .createModal<TimetableRecordModalComponent>({type: TimetableRecordModalComponent})
            .subscribe(modal => this.timetableModal = modal);
    }

    displayTimetables() {
        this.timetableModal?.displayTimetableRecords({masterId: this.masterId});
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(sub => sub.unsubscribe());

        if (this.timetableModal != null)
            this.modalService.deleteModal(this.timetableModal);
    }

    imageLoaded($event: Event) {
    }

    goTo(key: string) {
        const link = this.settingsPipe.transform(this.masterInfo?.profiles, key)
        if (link)
            goToExternalLink(link);
    }
}
