import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Indexer, readImageAsDataUrl} from '../../../app/utils/utils';
import {UiKit} from '../../../app/utils/ui-kit';
import {ImageCroppModalComponent} from '../image-cropp-modal/image-cropp-modal.component';
import {ManageImageApiService} from '../../services/manage-image-api.service';
import GetCroppedCanvasOptions = Cropper.GetCroppedCanvasOptions;
import {NewsBlock} from '../../../app/pages/news-page/news-details/news-details.component';

@Component({
  selector: 'mg-add-image-modal',
  templateUrl: './add-image-modal.component.html',
  styleUrls: ['./add-image-modal.component.scss'],
  providers: [
      ManageImageApiService
  ]
})
export class AddImageModalComponent implements OnInit, AfterViewInit {

  readonly id: string = `add-image-modal-${Indexer.getId()}`;
  get sdi(): string {
    return '#' + this.id
  }
  modal: any;

  @Input() pathPrefix: string = '';
  @Input() aspectRatio: number;
  @Input() saveOptions: GetCroppedCanvasOptions = {};
  @Output() onImageAdded: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('croppModalComponent') croppModalComponent: ImageCroppModalComponent;

  imageUrl: string = null;
  imagePath: any = null;

  constructor(
      private readonly imageService: ManageImageApiService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = UiKit.modal(this.sdi);
  }

  imageCropped($event: string) {
    this.imageService.add({
      dataUrl: $event,
      pathPrefix: this.pathPrefix
    }).subscribe(id => {
      this.onImageAdded.emit(id);
    })
  }

  open() {
    this.imageUrl = null;
    this.imagePath = null;
    this.modal.show();
  }

  fileChosen($event: Event) {
    readImageAsDataUrl($event, (imageUrl) => {
      this.close();
      this.croppModalComponent.imageUrl = imageUrl;
      this.croppModalComponent.open();
    })
  }

  close() {
    this.modal.hide();
    this.croppModalComponent.close();
  }
}
