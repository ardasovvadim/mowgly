import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Indexer} from '../../utils/utils';
import {UiKit} from '../../utils/uiKit';

@Component({
  selector: 'mg-frame-gallery',
  templateUrl: './frame-gallery.component.html',
  styleUrls: ['./frame-gallery.component.scss']
})
export class FrameGalleryComponent implements OnInit, AfterViewInit {

  @Input() imgPaths: string[] = []
  public readonly elementId: string = `gallery-${Indexer.getId()}`
  private nativeEl: HTMLElement | null = null;
  public currentIndex: number = 0;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.nativeEl = document.getElementById(this.elementId);
    this.show(0);

    // listen event to set appropriate current index on slide
    UiKit.util.on(this.nativeEl, 'beforeitemshow', (e: any, slideshow: any) => {
      let index = slideshow.index;
      if (this.currentIndex != index)
        this.currentIndex = index;
    });
  }

  show(index: number): void {
    if (!!this.nativeEl) {
      UiKit.slideshow(this.nativeEl).show(index);
      this.currentIndex = index;
    }
  }

  next() {
    if (this.imgPaths.length <= this.currentIndex + 1)
      this.show(0);
    else
      this.show(++this.currentIndex);
  }

  prev() {
    if (this.currentIndex - 1 <= -1)
      this.show(this.imgPaths.length - 1);
    else
      this.show(--this.currentIndex);
  }
}
