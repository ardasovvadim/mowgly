import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LocationApiService} from '../../../app/services/location-api.service';
import {LocationViewModel} from '../../../app/models/locations/location.view.model';
import {ModalService} from '../../../app/services/modal.service';
import {ManageLocationModalComponent} from './manage-location-modal/manage-location-modal.component';
import {Subscription} from 'rxjs';
import {ManageLocationApiService} from '../../services/manage-location-api.service';
import {LocationEditModel} from '../../models/location.model';

@Component({
  selector: 'mg-manage-locations-page',
  templateUrl: './manage-locations-page.component.html',
  styleUrls: ['./manage-locations-page.component.scss'],
  providers: [
    ManageLocationApiService
  ]
})
export class ManageLocationsPageComponent implements OnInit, AfterViewInit {

  originLocations: LocationViewModel[] = [];
  get locations(): LocationViewModel[]  {
    let result = this.originLocations;

    if (this.filteringCity != null)
      result = this.originLocations.filter(l => l.city == this.filteringCity);

    if (this.filterText != null) {
      const search = this.filterText as string;
      result = result.filter(l => l.name.toLowerCase().includes(search.toLowerCase().trim()))
    }

    return result.sort((l1, l2) => l1.name > l2.name ? 1 : -1);
  }
  cities: string[] = [];
  filteringCity: string | null = null;
  filterText: string | null = null;

  @ViewChild('manageLocationModalComponent') modal: ManageLocationModalComponent;

  constructor(private locationService: ManageLocationApiService) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  addNew() {
    this.modal.showLocation({} as LocationEditModel);
  }

  edit(location: LocationViewModel) {
    this.locationService.getById(location.id)
        .subscribe(data => {
          this.modal.showLocation(data);
        })
  }

  refreshData() {
    this.locationService
        .getAll()
        .subscribe(locations => {
          this.originLocations = locations;
          this.cities = locations
              .map(l => l.city)
              .filter((v, i, s) => s.indexOf(v) == i)
              .sort();
        });
  }

  ngAfterViewInit(): void {
    this.modal.submittedAndClosed.subscribe(_ => this.refreshData());
  }
}
