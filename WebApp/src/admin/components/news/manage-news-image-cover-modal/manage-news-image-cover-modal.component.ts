import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ManageModal} from '../../manage-modal/manage-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsBlock, NewsImageBlock} from '../../../../app/pages/news-page/news-details/news-details.component';
import {Indexer} from '../../../../app/utils/utils';
import {UiKit} from '../../../../app/utils/ui-kit';
import {AddImageModalComponent} from '../../add-image-modal/add-image-modal.component';

@Component({
  selector: 'mg-manage-news-image-cover-modal',
  templateUrl: './manage-news-image-cover-modal.component.html',
  styleUrls: ['./manage-news-image-cover-modal.component.scss']
})
export class ManageNewsImageCoverModalComponent implements AfterViewInit {

  readonly id: string = `manage-new-image-modal-${Indexer.getId()}`;

  block: NewsBlock;
  form: FormGroup = this.fb.group({
    'url': ['', [Validators.required]],
    'caption': ['']
  });
  showCaptionInput = true;
  modal: any;

  get sid(): string {
    return '#' + this.id;
  }

  @ViewChild('addImageModal') addImageModal: AddImageModalComponent;
  @Output() onImageSaved: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly fb: FormBuilder
  ) {
  }

  showImageData(data: NewsBlock) {
    this.block = data;
    this.form.reset(JSON.parse(this.block.data) as NewsImageBlock);
    this.open();
  }

  cancel() {
    this.close();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.block.data = JSON.stringify(this.form.value);
    this.onImageSaved.emit();
  }

  close() {
    this.modal.hide();
  }

  open() {
    this.modal.show();
  }

  ngAfterViewInit(): void {
    this.modal = UiKit.modal(this.sid);

    this.addImageModal.onImageAdded.subscribe(imageDataUrl => {
      this.form.get('url')?.setValue(imageDataUrl);
      this.addImageModal.close();
      this.open();
    });
  }

  addNewImage() {
    this.close();
    this.addImageModal.open();
  }
}
