import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ManageModal} from '../../manage-modal/manage-modal';
import {ManageModalComponent} from '../../manage-modal/manage-modal.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NewsImageBlock} from '../../../../pages/news-page/news-details/news-details.component';

@Component({
  selector: 'mg-manage-news-image-cover-modal',
  templateUrl: './manage-news-image-cover-modal.component.html',
  styleUrls: ['./manage-news-image-cover-modal.component.scss']
})
export class ManageNewsImageCoverModalComponent extends ManageModal {

  form: FormGroup = this.fb.group({
    'url': [''],
    'caption': ['']
  });

  showCaptionInput = true;

  constructor(
    private readonly fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
  }

  showImageData(data: NewsImageBlock) {
    this.form.patchValue(data);
    this.open();
  }

  cancel() {
    this.onSubmittedAndClosed.emit(null);
    this.close();
  }

  submit() {
    this.onSubmittedAndClosed.emit(this.form.value as NewsImageBlock);
    this.close();
  }
}
