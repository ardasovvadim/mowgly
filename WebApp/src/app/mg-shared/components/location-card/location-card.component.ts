import {Component, Input, OnInit} from '@angular/core';
import {LocationViewModel} from '../../../models/locations/location.view.model';
import {goToExternalLink} from '../../../utils/utils';
import {GMapsUtils} from "../../../utils/g-maps-utils";

@Component({
  selector: 'mg-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {

  @Input() location: LocationViewModel = {} as LocationViewModel;

  constructor() { }

  ngOnInit(): void {
  }

  goToMap = (externalLink: LocationViewModel) => goToExternalLink(GMapsUtils.getMapUrl(externalLink.address));

}
