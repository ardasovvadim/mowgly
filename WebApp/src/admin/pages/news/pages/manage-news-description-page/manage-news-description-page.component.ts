import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsManageService} from '../../../../services/news-manage.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {
    ManageNewsImageCoverModalComponent
} from '../../components/manage-news-image-cover-modal/manage-news-image-cover-modal.component';
import {
    ManageTextHtmlModalComponent
} from '../../../../shared-admin/components/manage-text-html-modal/manage-text-html-modal.component';
import {
    ManageNewsVideoModalComponent
} from '../../components/manage-news-video-modal/manage-news-video-modal.component';
import {mgConfirm, mgPrompt, mgSuccessNotification} from '../../../../../app/utils/ui-kit';
import {ManageNewsApiService} from '../../../../services/manage-news-api.service';
import {AddImageModalComponent} from '../../../../../app/mg-shared/components/add-image-modal/add-image-modal.component';
import {
    ChooseOrCreateEventModalComponent
} from '../../../../shared-admin/components/choose-or-create-event-modal/choose-or-create-event-modal.component';
import {NewsBlock, NewsBlockType, NewsDetailsVm} from "../../../../../app/models/news/news-vm";

@Component({
    selector: 'mg-manage-news-description-page',
    templateUrl: './manage-news-description-page.component.html',
    styleUrls: ['./manage-news-description-page.component.scss'],
    providers: [
        ManageNewsApiService,
        NewsManageService,
    ]
})
export class ManageNewsDescriptionPageComponent implements OnInit, AfterViewInit, OnDestroy {

    news: NewsDetailsVm = {} as NewsDetailsVm;
    blockTypes = NewsBlockType;
    imageUrlError: string = null;

    get isEditMode(): boolean {
        return !this.news?.id
    }

    @ViewChild('imageCoverModal') modalManageImage: ManageNewsImageCoverModalComponent;
    @ViewChild('textHtmlModal') modalManageTextHtml: ManageTextHtmlModalComponent;
    @ViewChild('videoModal') modalManageVideo: ManageNewsVideoModalComponent;
    @ViewChild('addImageModal') addImageModal: AddImageModalComponent;
    @ViewChild('addImageCoverModal') addImageCoverModal: AddImageModalComponent;
    @ViewChild('htmlElement') htmlElement: ElementRef;
    @ViewChild('createEventModal') createEventModal: ChooseOrCreateEventModalComponent;
    descriptionEditorConfig = {
        blockToolbar: [],
        placeholder: 'Введіть опис новини',
    };
    textBlockEditorConfig = {
        placeholder: 'Введіть текст',
    };

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly newsManageService: NewsManageService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(
            map(params => params['id']),
            switchMap(id => this.newsManageService.getNews(id))
        )
            .subscribe({
                error: () => this.router.navigate(['/404'])
            });

        this.newsManageService.$data.subscribe(data => {
            // todo: delete
            console.log(data)
            this.news = data;
        });
    }

    ngAfterViewInit(): void {
        this.newsManageService.createEventModal = this.createEventModal;

        this.addImageCoverModal.onImageAdded.subscribe(imageDataUrl => {
            this.news.imageUrl = imageDataUrl;
            this.imageUrlError = null;
            this.addImageCoverModal.close();
            this.saveResult();
        });

        this.modalManageImage.onImageSaved.subscribe(() => {
            this.saveResult();
            this.modalManageImage.close();
        });

        let tournamentId = null;
        this.createEventModal.onCreated
            .pipe(
                filter(id => !!id),
                switchMap(id => {
                    this.newsManageService.addTournamentTableBlock(id);
                    tournamentId = id;
                    return mgConfirm('Закрепить турнир за этой новостью?');
                })
            )
            .subscribe({
                next: () => {
                    this.news.tournamentId = tournamentId;
                    this.saveResult();
                },
                error: () => {}
            })
    }

    ngOnDestroy(): void {
        this.saveResult();
    }

    saveResult(): void {
        this.newsManageService.saveState();
    }

    reset() {
        this.newsManageService.reset();
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
        this.addImageCoverModal.open()
    }

    editImageBlock(block: NewsBlock) {
        this.modalManageImage.showImageData(block);
    }

    editVideo(block: NewsBlock) {
        mgPrompt('Ссылка на видео', block.data)
            .subscribe(url => {
                if (url)
                    block.data = url;

                this.saveResult();
            });
    }

    publish() {
        mgConfirm('Опубликовать новость?')
            .pipe(
                switchMap(() => this.newsManageService.publish()),
            )
            .subscribe(data => {
                mgSuccessNotification(`<span uk-icon="check" class="uk-margin-small-right"></span> Новость была опубликована`)
                if (this.isEditMode)
                    this.router.navigate(['../', data.id], {relativeTo: this.route});
            })
    }

    delete() {
        mgConfirm('Вы уверены что хотите удалить новость?')
            .pipe(
                switchMap(() => this.newsManageService.deleteNews())
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['../'], {relativeTo: this.route})
                },
                error: () => {}
            })
    }

    deleteImageCover() {
        this.news.imageUrl = null;
        this.imageUrlError = null;
        this.saveResult();
    }

    addTextBlock() {
        this.newsManageService.addBlock(this.getLatestBlock(), NewsBlockType.Text);
    }

    addTournamentTable() {
        this.newsManageService.addBlock(this.getLatestBlock(), NewsBlockType.TournamentResultsTable);
    }

    private getLatestBlock(): NewsBlock {
        const blocks = this.news.blocks;
        return blocks ? blocks[blocks.length - 1] : null;
    }

    addImage() {
        this.newsManageService.addBlock(this.getLatestBlock(), NewsBlockType.Image);
    }

    onImageUrlError(error: ErrorEvent) {
        this.imageUrlError = error.message ?? "Зображення на обкладинці новини не може бути завантажене. Будь-ласка перевірте посилання або замініть його."
    }
}
