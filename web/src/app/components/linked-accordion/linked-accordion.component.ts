import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../../services/breakpoint.service';
import {UiKit} from '../../utils/uiKit';
import {Indexer} from '../../utils/utils';

@Component({
  selector: 'mg-linked-accordion',
  templateUrl: './linked-accordion.component.html',
  styleUrls: ['./linked-accordion.component.scss']
})
export class LinkedAccordionComponent implements OnInit {

  prices: any[] = [
    {
      title: 'Учебно-тренировочные группы',
      description: 'Группа предназначена для более «продвинутых» спортсменов, владеющих основами каратэ или других единоборств; или занимавшихся другими видами спорта, с начальной физической подготовкой. Дальнейшее развитие физических качеств, навыки самообороны, подготовка к выступлениям в соревнованиях, аттестациям на цветные пояса.',
      price: '650 грн./ мес.'
    },
    {
      title: 'Группы общей физической подготовки',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut corporis deleniti doloremque eum, inventore itaque necessitatibus nemo nihil quam. Aut consequuntur dicta harum in quidem suscipit veritatis voluptates voluptatum?',
      price: '550 грн./ мес.'
    },
    {
      title: 'Группы спортивного совершенствования',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad aperiam architecto cumque deleniti, deserunt, ducimus eaque error excepturi harum molestiae nesciunt nulla provident quas quisquam rem suscipit? Culpa dolor doloribus enim, illum, iste laboriosam magni nisi placeat porro, possimus quos recusandae rem? Beatae eveniet facere illum maiores quis tenetur.',
      price: '450 грн./ мес.'
    }
  ]

  public currentPrice: any = null;
  public lgBreakpoint: boolean;
  public readonly accordionId: string = `accordion-${Indexer.getId()}`;

  constructor(private breakpointService: BreakpointService) {
    this.currentPrice = this.prices[0];
    this.lgBreakpoint = breakpointService.isMatchedMinLgBreakpoint;
    this.breakpointService.minLgBreakpoint$.subscribe(matches => {
      if (this.lgBreakpoint != matches) {
        this.lgBreakpoint = matches;
      }
    });
  }

  ngOnInit(): void {
  }

}
