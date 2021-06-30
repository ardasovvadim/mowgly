import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mg-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  places: any[] = [
    {name: 'Спортклуб "Таирово"', description: 'Здание Областного Методического Центра в котором мы расположились находится на пересечении улиц Градоначальницкой и 10 Апреля.'},
    {name: 'Спортклуб "Таирово"', description: 'Здание Областного Методического Центра в котором мы расположились находится на пересечении улиц Градоначальницкой и 10 Апреля.'},
    {name: 'Спортклуб "Таирово"', description: 'Здание Областного Методического Центра в котором мы расположились находится на пересечении улиц Градоначальницкой и 10 Апреля.'},
  ]
  currentIndex: number = 0;

  constructor() {
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
}
