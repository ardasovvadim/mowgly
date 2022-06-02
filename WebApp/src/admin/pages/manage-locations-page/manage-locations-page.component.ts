import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LocationViewModel} from '../../../app/models/locations/location.view.model';
import {ManageLocationModalComponent} from './manage-location-modal/manage-location-modal.component';
import {ManageLocationApiService} from '../../services/manage-location-api.service';
import {AdminLocationVm, LocationEditModel} from '../../models/location.model';
import {PageOptions} from '../../../app/models/page';
import {PaginationComponent} from '../../../app/mg-shared/components/pagination/pagination.component';
import {toSortOrder} from '../../../app/services/events-api.service';
import {tap} from 'rxjs';
import {fadeInAnimation} from '../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../app/mg-shared/animations/smooth-height-anim.directive';
import {OptionsApiService} from '../../../app/services/options-api.service';

@Component({
    selector: 'mg-manage-locations-page',
    templateUrl: './manage-locations-page.component.html',
    styleUrls: ['./manage-locations-page.component.scss'],
    providers: [
        ManageLocationApiService,
        OptionsApiService
    ],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
})
export class ManageLocationsPageComponent implements OnInit, AfterViewInit {

    cities: string[] = [];
    data: AdminLocationVm[] = [];
    filterCity: string | null = null;
    filterText: string = null;

    asc: boolean = true;
    private readonly initialPageOptions = {
        count: 0,
        pageSize: 10,
        pageNumber: 0
    }
    pageOptions: PageOptions = {...this.initialPageOptions};

    @ViewChild('pagination') pagination: PaginationComponent;
    @ViewChild('manageLocationModalComponent') modal: ManageLocationModalComponent;
    currentRowIndex: number = -1;

    constructor(
        private readonly locationService: ManageLocationApiService,
        private readonly optionsService: OptionsApiService
    ) {
    }

    ngOnInit(): void {
        this.refreshData();
    }

    addNew() {
        this.modal.showLocation({} as LocationEditModel);
    }

    edit(location: AdminLocationVm) {
        this.locationService.getById(location.id)
            .subscribe(data => {
                this.modal.showLocation(data);
            })
    }

    refreshData() {
        this.locationService.getList({
            filterCity: this.filterCity,
            filterText: this.filterText,
            pageNumber: this.pageOptions.pageNumber,
            pageSize: this.pageOptions.pageSize,
            sort: 'Name',
            sortOrder: toSortOrder(this.asc)
        })
            .pipe(
                tap(data => {
                    if (!data) {
                        this.pageOptions = null;
                        return
                    }

                    this.pageOptions = {
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                        count: data.count
                    }
                }),
            )
            .subscribe(data => {
                this.data = data.elements?.sort();
            });

        this.optionsService.getCities().subscribe(data => this.cities = data);
    }

    ngAfterViewInit(): void {
        this.modal.submittedAndClosed.subscribe(_ => this.refreshData());
    }
}
