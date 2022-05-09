import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import * as moment from 'moment';
import {tap} from 'rxjs/operators';
import {ManageTournamentModalComponent} from '../components/manage-tournament-modal/manage-tournament-modal.component';
import {
  NewsBlock,
  NewsBlockType,
  NewsDetailsVm,
  NewsImageBlock, TournamentEditModel, TournamentResultsData
} from '../../app/pages/news-page/news-details/news-details.component';
import {StorageService} from '../../app/services/storage.service';
import {UserDataService} from '../../app/services/user-data.service';
import {Indexer} from '../../app/utils/utils';

@Injectable()
export class NewsManageService {

  set newsManageService(value: ManageTournamentModalComponent) {
    this._modalManageTournament = value;
  }

  get $data(): Observable<NewsDetailsVm> {
    return this.dataSub.asObservable();
  }

  private get blocks(): NewsBlock[] {
    return this.data?.blocks;
  }

  private isPublished = false;
  private data: NewsDetailsVm;
  private _modalManageTournament: ManageTournamentModalComponent;
  private readonly saveKey = 'unsaved-article';

  private readonly dataSub: BehaviorSubject<NewsDetailsVm> = new BehaviorSubject<NewsDetailsVm>(null);

  constructor(
    private readonly storageService: StorageService,
    private readonly userData: UserDataService
  ) {
    console.log('created')
  }

  blockUp(block: NewsBlock) {
    const currentIndex = this.blocks.indexOf(block);
    if (currentIndex == 0)
      return;
    const movingItem = this.blocks[currentIndex-1];
    this.blocks[currentIndex] = movingItem;
    this.blocks[currentIndex - 1] = block;

    this.saveState();
  }

  blockDown(block: NewsBlock) {
    const currentIndex = this.blocks.indexOf(block);
    if (currentIndex == this.blocks.length - 1)
      return;
    const movingItem = this.blocks[currentIndex+1];
    this.blocks[currentIndex] = movingItem;
    this.blocks[currentIndex + 1] = block;

    this.saveState();
  }

  deleteBlock(block: NewsBlock) {
    const index = this.blocks.indexOf(block);
    this.blocks.splice(index, 1);

    this.saveState();
  }

  // todo: animation in a future?
  addBlock(block: NewsBlock, type: NewsBlockType) {
    const newBlock = this.createBlock(block, type);

    switch (type) {
      case NewsBlockType.Image: {
        const defaultImageBlockData = {
          url: 'https://autosdutriomphe.fr/wp-content/uploads/2018/04/default-image.png',
          caption: 'Подпись'
        } as NewsImageBlock;
        newBlock.data = JSON.stringify(defaultImageBlockData);
        break;
      }
      case NewsBlockType.Text: {
        newBlock.data = `<p>Текст ${Indexer.getId()}</p>`
        break;
      }
      case NewsBlockType.Video: {
        newBlock.data = 'https://www.youtube.com/embed/bfoGTrtFc5g'
        break;
      }
      case NewsBlockType.TournamentResultsTable: {
        this._modalManageTournament.manageTournament({} as TournamentResultsData);
        const sub = this._modalManageTournament.onSubmittedAndClosed
          .subscribe((data: TournamentEditModel) => {
            if (data)
              newBlock.data = data.id;
            sub.unsubscribe();
          })
        break;
      }
    }

    this.saveState();
  }

  getNews(id: string): Observable<NewsDetailsVm> {
    return this._getNews(id).pipe(
      tap(data => this.dataSub.next(data))
    );
  }

  private _getNews(id: string): Observable<NewsDetailsVm> {
    if (id === "new") {
      this.data = this.storageService.get<NewsDetailsVm>(this.saveKey);
      if (!this.data)
        this.reset(false);

      return of(this.data);
    }

    return of(null);
  }

  saveState() {
    if (this.data && !this.isPublished)
      this.storageService.set(this.saveKey, this.data);
  }

  reset(emmit: boolean = true) {
    this.data = {
      title: 'Заголовок',
      description: 'Описание',
      author: 'Хомутенко Руслан Николаевич',
      authorAvatar: '',
      authorId: this.userData.getUserId(),
      createdDate: moment().toISOString(),
    } as NewsDetailsVm;

    if (emmit)
      this.dataSub.next(this.data);

    this.saveState();
  }

  private createBlock(block: NewsBlock, type: NewsBlockType): NewsBlock {
    if (!this.blocks) {
      this.data.blocks = [];
    }

    const index = block ? this.blocks.indexOf(block) : -1;
    const newBlock = {type, order: 0} as NewsBlock;
    this.blocks.splice(index+1, 0, newBlock);

    return newBlock;
  }

  editTournament(tournament: TournamentEditModel) {
    this._modalManageTournament.manageTournament(tournament);
    const sub = this._modalManageTournament.onSubmittedAndClosed
      .subscribe((data: TournamentEditModel) => {
        if (data) {
          tournament.name = data.name;
          tournament.actionDate = data.actionDate;
        }
        sub.unsubscribe();
      });
  }

  deleteBlockByTournamentId(tournamentId: string) {
    const block = this.blocks.find(b => b.type == NewsBlockType.TournamentResultsTable && b.data === tournamentId);
    if (block)
      this.deleteBlock(block);
  }
}
