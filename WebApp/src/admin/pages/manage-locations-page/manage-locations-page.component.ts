import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationService} from '../../../app/services/location.service';
import {LocationViewModel} from '../../../app/models/locations/location.view.model';
import {ModalService} from '../../../app/services/modal.service';
import {ManageLocationModalComponent} from './manage-location-modal/manage-location-modal.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mg-manage-locations-page',
  templateUrl: './manage-locations-page.component.html',
  styleUrls: ['./manage-locations-page.component.scss']
})
export class ManageLocationsPageComponent implements OnInit, OnDestroy {

  originLocations: LocationViewModel[] = [];
  get locations(): LocationViewModel[]  {
    let result = this.originLocations;

    if (this.filteringCity != null)
      result = this.originLocations.filter(l => l.city == this.filteringCity);

    if (this.nameFiltering != null) {
      const search = this.nameFiltering as string;
      result = result.filter(l => l.name.toLowerCase().includes(search.toLowerCase().trim()))
    }

    return result.sort((l1, l2) => l1.name > l2.name ? 1 : -1);
  }
  cities: string[] = [];
  modal: ManageLocationModalComponent | null = null;
  filteringCity: string | null = null;
  nameFiltering: string | null = null;
  subscriptions: Subscription[] = [];

  constructor(private locationService: LocationService,
              private modalService: ModalService) {
  }

  ngOnDestroy(): void {
     this.subscriptions.forEach(s => s.unsubscribe());
     if (this.modal != null)
       this.modalService.deleteModal(this.modal);
  }

  ngOnInit(): void {
    this.refreshLocations();

    this.modalService
      .createModal<ManageLocationModalComponent>({type: ManageLocationModalComponent})
      .subscribe(modal => {
        this.modal = modal;
        if (this.modal != null) {
          const sub = this.modal.submittedAndClosed.subscribe(_ => this.refreshLocations());
          this.subscriptions.push(sub);
          this.modal.close()
        }
      });
  }

  addNew() {
    this.modal?.showLocation(new LocationViewModel());
  }

  edit(location: LocationViewModel) {
    this.modal?.showLocation(location);
  }

  private refreshLocations() {
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
}
