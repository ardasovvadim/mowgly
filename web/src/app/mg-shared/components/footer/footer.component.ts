import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {goToExternalLink} from '../../../utils/utils';

@Component({
  selector: 'mg-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  places: any[] = [
    {
      name: 'Спортклуб "Таирово"',
      description: 'Здание Областного Методического Центра в котором мы расположились находится на пересечении улиц Градоначальницкой и 10 Апреля.',
      link: 'https://goo.gl/maps/SDkJavBLFcbGTvRT9',
      apiLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24889.63399048832!2d36.1984411225409!3d50.04208856217546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a6a80ed1cd07%3A0x7970fb8f3fc14bf8!2z0J7Qu9C10LrRgdGW0ZfQstGB0YzQutCw!5e0!3m2!1suk!2sua!4v1626964163862!5m2!1suk!2sua'
    },
    {
      name: 'Пример 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto aut autem consequuntur dicta dolorum ducimus, ea fugit ipsum itaque minima numquam optio quasi tempora ut vitae voluptatem voluptates voluptatum.',
      link: 'https://goo.gl/maps/8WJPbJ5sbvhj5FJj8',
      apiLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32628.247079159806!2d36.21310180290763!3d50.02289684235461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0c3257691b5%3A0x881bf9cbde032f2c!2z0J_Rg9GI0LrRltC90YHRjNC60LA!5e0!3m2!1suk!2sua!4v1626964119882!5m2!1suk!2sua'
    },
    {
      name: 'Пример 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto aut autem consequuntur.',
      link: 'https://goo.gl/maps/SM9cSdWRoBGBHnwV9',
      apiLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24889.63399048832!2d36.1984411225409!3d50.04208856217546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a6a80ed1cd07%3A0x7970fb8f3fc14bf8!2z0J7Qu9C10LrRgdGW0ZfQstGB0YzQutCw!5e0!3m2!1suk!2sua!4v1626964163862!5m2!1suk!2sua'
    },
  ]
  // ------
  private _currentIndex: number = 0;
  public get currentIndex(): number {
    return this._currentIndex;
  }
  public set currentIndex(value: number) {
    if (this._currentIndex != value) {
      this._currentIndex = value;
      this.apiLink = this.places[value];
    }
  }
  // ------
  apiLink: string = '';

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  next() {
    if (this.currentIndex >= this.places.length - 1)
      return;
    else
      this.currentIndex += 1;
  }

  previous() {
    if (this.currentIndex <= 0)
      return;
    else
      this.currentIndex -= 1;
  }

  getGoogleApiLink(place: any): string {
    return <string>this.domSanitizer.bypassSecurityTrustResourceUrl(place.apiLink);
  }

  goToGoogleMapLink = () => goToExternalLink(this.places[this.currentIndex].link);

}

