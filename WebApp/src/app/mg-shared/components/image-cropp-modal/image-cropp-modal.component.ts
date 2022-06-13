import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Indexer} from '../../../utils/utils';
import {CropperComponent} from 'angular-cropperjs';
import UIkit from 'uikit';
import GetCroppedCanvasOptions = Cropper.GetCroppedCanvasOptions;

@Component({
  selector: 'mg-image-cropp-modal',
  templateUrl: './image-cropp-modal.component.html',
  styleUrls: ['./image-cropp-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageCroppModalComponent implements OnInit, AfterViewInit {

  readonly id: string = `image-crop-modal-${Indexer.getId()}`;
  get sid(): string {
    return '#' + this.id;
  }

  cropperOptions: any = {
    center: true,
    guides: true,
    viewMode: 1,
    aspectRatio: 1,
    scalable: true,
    zoomable: true,
    autoCrop: true,
    zoom: (e) => {},
    crop: (e) => {},
    cropstart: (e) => {},
    cropend: (e) => {},
    ready: (e) => {}
  };

  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();
  @Input() imageUrl: any;
  @Input() circleCropper: boolean = false;
  @Input() set aspectRatio(value: number) {
    this.cropperOptions.aspectRatio = value;
  }
  @Input() saveOptions: GetCroppedCanvasOptions = {}

  @ViewChild('cropper') cropperComponent: CropperComponent;

  get cropper(): Cropper {
    return this.cropperComponent.cropper
  }
  modal: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = UIkit.modal(this.sid);
  }

  open() {
    this.modal.show()
  }

  save() {
    const imageDataUrl = this.cropper.getCroppedCanvas(this.saveOptions).toDataURL()
    this.onSave.emit(imageDataUrl);
  }

  close() {
    this.modal.hide()
  }
}
