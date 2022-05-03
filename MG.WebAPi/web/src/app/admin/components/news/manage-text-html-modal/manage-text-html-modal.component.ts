import {Component} from '@angular/core';
import {ManageModal} from '../../manage-modal/manage-modal';
import {NewsBlock} from '../../../../pages/news-page/news-details/news-details.component';

@Component({
  selector: 'mg-manage-text-html-modal',
  templateUrl: './manage-text-html-modal.component.html',
  styleUrls: ['./manage-text-html-modal.component.scss']
})
export class ManageTextHtmlModalComponent extends ManageModal {

  html: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  close() {
    this.close();
    this.onSubmittedAndClosed.emit(null);
  }

  showTextHtml(block: NewsBlock) {
    this.html = block.data ?? '';
    this.open();
  }

  submit() {
    this.close();
    this.onSubmittedAndClosed.emit(this.html);
  }
}
