import {Component} from '@angular/core';
import {ManageModal} from '../../../../shared-admin/components/manage-modal/manage-modal';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'mg-manage-news-video-modal',
  templateUrl: './manage-news-video-modal.component.html',
  styleUrls: ['./manage-news-video-modal.component.scss']
})
export class ManageNewsVideoModalComponent extends ManageModal {

  videoUrl: string;

  constructor(
    private readonly fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
  }

  showVideoData(url: string) {
    this.videoUrl = url;
    this.open();
  }

  cancel() {
    this.onSubmittedAndClosed.emit(null);
    this.close();
  }

  submit() {
    this.onSubmittedAndClosed.emit(this.videoUrl);
    this.close();
  }
}
