import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentState, MgComponentService} from '../../../../services/mg-component.service';
import {LocationApiService} from '../../../../services/location-api.service';
import {LocationViewModel} from '../../../../models/locations/location.view.model';
import {goToExternalLink} from '../../../../utils/utils';

@Component({
  selector: 'mg-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, OnDestroy {

  locations: LocationViewModel[];
  currentLocation: LocationViewModel;
  currentIndex: number = 0;

  constructor(
      private readonly mgComponentService: MgComponentService,
      private readonly locationService: LocationApiService
  ) { }

  ngOnInit(): void {
    this.mgComponentService.changeState({isFooterBar: false} as ComponentState);

    this.locationService.getAll().subscribe(locations => {
      this.locations = locations;
      if (locations?.length)
        this.currentLocation = locations[0];
    });
  }

  ngOnDestroy(): void {
    this.mgComponentService.changeState({isFooterBar: true} as ComponentState);
  }

  next() {
    if (this.currentIndex != -1 && this.locations.length > this.currentIndex + 1) {
      ++this.currentIndex;
      this.currentLocation = this.locations[this.currentIndex];
    }
  }

  previous() {
    if (this.currentIndex != -1 && this.currentIndex - 1 >= 0) {
      --this.currentIndex;
      this.currentLocation = this.locations[this.currentIndex];
    }
  }

  chooseLocation(location: LocationViewModel) {
    const index = this.locations.indexOf(location);
    this.currentLocation = location;
    this.currentIndex = index;
  }

  goToMaps(googleMapsLink: string) {
    goToExternalLink(googleMapsLink);
  }
}
