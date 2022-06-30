import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {goToExternalLink} from '../../../utils/utils';
import {LocationApiService} from '../../../services/location-api.service';
import {LocationViewModel} from '../../../models/locations/location.view.model';

@Component({
    selector: 'mg-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LocationApiService
    ]
})
export class FooterComponent implements OnInit {

    data: LocationViewModel[] = []
    currentLocation: LocationViewModel = null;
    currentIndex: number = -1;

    constructor(
        private domSanitizer: DomSanitizer,
        private readonly locationService: LocationApiService,
        private readonly changeRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.locationService.getAll().subscribe(data => {
            this.data = data;
            if (data.length > 0) {
                this.currentLocation = this.data[0];
                this.currentIndex = 0;
            }
            this.changeRef.detectChanges()
        });
    }

    next() {
        if (this.currentIndex != -1 && this.data.length > this.currentIndex + 1) {
            ++this.currentIndex;
            this.currentLocation = this.data[this.currentIndex];
            this.changeRef.detectChanges();
        }
    }

    previous() {
        if (this.currentIndex != -1 && this.currentIndex - 1 >= 0) {
            --this.currentIndex;
            this.currentLocation = this.data[this.currentIndex];
            this.changeRef.detectChanges();
        }
    }

    goToGoogleMapLink = () => goToExternalLink(this.currentLocation?.googleMapsLink);

    changeCurrentItem(location: LocationViewModel, index: number) {
        this.currentLocation = location;
        this.currentIndex = index;
        this.changeRef.detectChanges();
    }
}

