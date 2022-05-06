import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NewsBlock,
  NewsBlockType,
  NewsDetailsVm,
  NewsImageBlock,
  TournamentResultsData
} from '../../../../pages/news-page/news-details/news-details.component';
import {FormBuilder} from '@angular/forms';
import {NewsManageService} from '../../../services/news-manage.service';
import {map, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ModalService} from '../../../../services/modal.service';
import {
  ManageNewsImageCoverModalComponent
} from '../../../components/news/manage-news-image-cover-modal/manage-news-image-cover-modal.component';
import {
  ManageTextHtmlModalComponent
} from '../../../components/news/manage-text-html-modal/manage-text-html-modal.component';
import {QuillEditorComponent, QuillModules} from 'ngx-quill';
import QuillType from 'quill';
import {
  ManageNewsVideoModalComponent
} from '../../../components/news/manage-news-video-modal/manage-news-video-modal.component';
import {
  ManageTournamentModalComponent
} from '../../../components/manage-tournament-modal/manage-tournament-modal.component';
import {displayNotification} from '../../../../utils/ui-kit';
import {AnswerType} from '../../../../mg-shared/components/confirm-dialog/confirm-dialog.component';
import {ManageNewsApiService} from '../../../services/manage-news-api.service';

@Component({
  selector: 'mg-manage-news-description-page',
  templateUrl: './manage-news-description-page.component.html',
  styleUrls: ['./manage-news-description-page.component.scss'],
  providers: [
    NewsManageService,
    ManageNewsApiService
  ]
})
export class ManageNewsDescriptionPageComponent implements OnInit, OnDestroy {

  @ViewChild('quillEditor') quillEditorComponent: QuillEditorComponent;

  private get quillEditor(): QuillType {
    return this.quillEditorComponent.quillEditor;
  }

  data: NewsDetailsVm;
  blockTypes = NewsBlockType;
  modalManageImage: ManageNewsImageCoverModalComponent;
  modalManageTextHtml: ManageTextHtmlModalComponent;
  modalManageVideo: ManageNewsVideoModalComponent;
  modalManageTournament: ManageTournamentModalComponent;

  private subscriptions: Subscription[] = [];
  quillEditorModules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent

      [{'header': [1, 2, 3, false]}],
      [{'align': []}],
      ['clean'],
      ['link']
    ],
    syntax: false,
    clipboard: {
      matchVisual: false
    }
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly newsManageService: NewsManageService,
    private readonly modalService: ModalService,
    private readonly newsApiService: ManageNewsApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let sub = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.newsManageService.getNews(id))
    )
      .subscribe(data => this.data = data);

    this.subscriptions.push(sub);

    sub = this.newsManageService.$data.subscribe(data => this.data = data);

    this.subscriptions.push(sub);

    sub = this.modalService.createModal<ManageNewsImageCoverModalComponent>({type: ManageNewsImageCoverModalComponent})
      .subscribe(modal => {
        if (modal) {
          this.modalManageImage = modal;
        }

        this.subscriptions.push(sub);
      })

    this.subscriptions.push(sub);


    this.subscriptions.push(this.modalService.createModal<ManageTextHtmlModalComponent>({type: ManageTextHtmlModalComponent})
      .subscribe(modal => {
        if (modal) {
          this.modalManageTextHtml = modal;
        }
      }));

    this.subscriptions.push(
      this.modalService.createModal<ManageNewsVideoModalComponent>({type: ManageNewsVideoModalComponent})
        .subscribe(modal => {
          if (modal) {
            this.modalManageVideo = modal;
          }
        })
    )

    this.modalService.createModal<ManageTournamentModalComponent>({type: ManageTournamentModalComponent})
      .subscribe(modal => {
        if (modal) {
          this.modalManageTournament = modal;
          this.newsManageService.newsManageService = modal;
        }
      })
  }

  saveResult(): void {
    this.newsManageService.saveState();
  }

  ngOnDestroy(): void {
    this.saveResult();
    this.subscriptions.forEach(s => s.unsubscribe());
    this.modalService.clearModals();
  }

  reset() {
    this.newsManageService.reset();
  }

  focus(inputId: string) {
    document.getElementById(inputId)?.focus();
  }

  editTextBlock(block: NewsBlock) {
    this.modalManageTextHtml.showTextHtml(block);
    const sub = this.modalManageTextHtml.onSubmittedAndClosed.subscribe(html => {
      if (html) {
        block.data = html;
        this.modalManageTextHtml.close();
      }

      this.saveResult();
      sub.unsubscribe();
    });
  }

  editImageCover() {
    this.modalManageImage.showCaptionInput = false;
    this.modalManageImage.showImageData({url: this.data.imageUrl} as NewsImageBlock);
    const sub = this.modalManageImage.onSubmittedAndClosed.subscribe((imageData: NewsImageBlock) => {
      if (imageData) {
        this.data.imageUrl = imageData.url;
      }

      this.saveResult();
      sub.unsubscribe();
    });
  }

  format() {
    this.quillEditor.format('bold', true);
  }

  editImageBlock(block: NewsBlock) {
    this.modalManageImage.showCaptionInput = true;
    this.modalManageImage.showImageData(JSON.parse(block.data) as NewsImageBlock);
    const sub = this.modalManageImage.onSubmittedAndClosed.subscribe((imageData: NewsImageBlock) => {
      block.data = JSON.stringify(imageData);
      this.saveResult();
      sub.unsubscribe();
    });
  }

  editVideo(block: NewsBlock) {
    this.modalManageVideo.showVideoData(block.data);
    const sub = this.modalManageImage.onSubmittedAndClosed.subscribe(videoUrl => {
      block.data = videoUrl;
      this.saveResult();
      sub.unsubscribe();
    });
  }

  editTournament(tournament: TournamentResultsData) {
    this.newsManageService.editTournament(tournament);
  }

  publish() {
    this.modalService.displayConfirmDialog()
      .subscribe(answer => {
        if (answer === AnswerType.Yes) {
          this.newsApiService.addNews(this.data)
            .subscribe(news => {
              displayNotification('Новость была опубликована', {status: 'success'});
              this.newsManageService.reset(false);
              this.router.navigate(['../'], {relativeTo: this.route});
            })
        }
      });
  }
}
