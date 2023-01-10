import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NewsBlock, NewsBlockType} from '../../../../../app/pages/news-page/news-details/news-details.component';
import {NewsManageService} from '../../../../services/news-manage.service';

@Component({
  selector: 'mg-manage-block',
  templateUrl: './manage-block.component.html',
  styleUrls: ['./manage-block.component.scss']
})
export class ManageBlockComponent implements OnInit, AfterViewInit {

  @ViewChild('content') content: ElementRef;

  @Input() block: NewsBlock = null;
  @Input() disablesTools = false;
  @Input() movingTools = true;
  @Input() editTool = true;
  @Input() deleteTool = true;
  @Input() addTool = true;

  isToolbarHidden = true;
  isHovered = false;

  @Output() onHovered: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onBlockEdit: EventEmitter<NewsBlock> = new EventEmitter<NewsBlock>();

  blockTypes = NewsBlockType;

  constructor(
    private readonly newsManageService: NewsManageService
  ) {
  }

  ngOnInit(): void {
  }

  blockUp() {
    this.newsManageService.blockUp(this.block);
  }

  blockDown() {
    this.newsManageService.blockDown(this.block);
  }

  blockEdit() {
    this.onBlockEdit.emit(this.block);
  }

  delete() {
    this.newsManageService.deleteBlock(this.block);
  }

  add(type: NewsBlockType) {
    this.newsManageService.addBlock(this.block, type);
  }

  ngAfterViewInit(): void {
  }
}
