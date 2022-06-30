import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointService} from '../../../services/breakpoint.service';
import {Indexer} from '../../../utils/utils';
import {fadeInAnimation} from '../../animations/fadeInAnimation';
import {SectionApiService} from '../../../services/section-api.service';
import {SectionVm} from '../../../models/sections/section.view.model';
import {TimetableRecordModalComponent} from '../timetable-record-modal/timetable-record-modal.component';

@Component({
  selector: 'mg-linked-accordion',
  templateUrl: './linked-accordion.component.html',
  styleUrls: ['./linked-accordion.component.scss'],
  animations: [fadeInAnimation],
  providers: [
      SectionApiService
  ]
})
export class LinkedAccordionComponent implements OnInit {

  data: SectionVm[] = []

  public currentSection: SectionVm = null;
  public lgBreakpoint: boolean;
  public readonly accordionId: string = `accordion-${Indexer.getId()}`;

  @ViewChild('timetable') timetable: TimetableRecordModalComponent;

  constructor(
      private readonly breakpointService: BreakpointService,
      private readonly sectionApiService: SectionApiService
  ) {
    this.lgBreakpoint = breakpointService.isMatchedMinLgBreakpoint;
    this.breakpointService.minLgBreakpoint$.subscribe(matches => {
      if (this.lgBreakpoint != matches) {
        this.lgBreakpoint = matches;
      }
    });
  }

  ngOnInit(): void {
    this.sectionApiService.getSectionByLocationId(null).subscribe(data => {
      this.data = data;

      if (data.length > 0)
        this.currentSection = this.data[0];
    });
  }

  displaySchedule(id: string) {
    this.timetable.displayTimetableRecords({sectionId: id});
  }
}
