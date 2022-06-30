import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {IdName} from '../../models/timetable-records/timetable-record.view.model';
import {
    TimetableRecordTableComponent
} from '../../mg-shared/components/timetable-record-table/timetable-record-table.component';
import {MgOptions, OptionsApiService} from '../../services/options-api.service';
import {finalize} from 'rxjs';

@Component({
    selector: 'mg-schedule-page',
    templateUrl: './schedule-page.component.html',
    styleUrls: ['./schedule-page.component.scss'],
    providers: [
        OptionsApiService
    ]
})
export class SchedulePageComponent implements OnInit, AfterViewInit {

    @ViewChild('timetable') timetable: TimetableRecordTableComponent;

    data: [] = [];
    filteringCity: string = null;
    filteringLocation: string = null;
    filteringSection: string = null;

    options: MgOptions;
    loading = false;

    constructor(
        private readonly optionsService: OptionsApiService,
        private readonly changeRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.optionsService.getOptions({cities: true, locations: true, sections: true})
            .subscribe(options => this.options = options);
    }

    refreshData() {
        this.loading = true;
        this.timetable.displayTimetableRecords({
            locationId: this.filteringLocation,
            sectionId: this.filteringSection,
            city: this.filteringCity
        })
            .pipe(
                finalize(() => this.loading = false)
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        this.refreshData();
        this.changeRef.detectChanges();
    }

}
