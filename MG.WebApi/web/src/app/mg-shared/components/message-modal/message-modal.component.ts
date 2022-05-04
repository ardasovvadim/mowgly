import { Component, OnInit } from '@angular/core';
import {Indexer} from '../../../utils/utils';

@Component({
  selector: 'mg-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  id: string = `mg-message-${Indexer.getId()}`;

  constructor() { }

  ngOnInit(): void {
  }

}
