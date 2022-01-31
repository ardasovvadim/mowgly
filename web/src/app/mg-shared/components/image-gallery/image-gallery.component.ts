import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mg-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  @Input() imageUrls: string[] = [];
  @Input() containerClasses: string[] | string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
