import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SectionVm} from '../../../models/sections/section.view.model';

@Component({
  selector: 'mg-reg-section',
  templateUrl: './reg-section.component.html',
  styleUrls: ['./reg-section.component.scss']
})
export class RegSectionComponent implements OnInit {

  @Input() section: SectionVm = new SectionVm();
  @Output() openTimeTable = new EventEmitter<SectionVm>();
  @Output() sectionSelected = new EventEmitter<SectionVm>();

  constructor() { }

  ngOnInit(): void {
  }

}
