import {Component, Input, OnInit} from '@angular/core';
import {MgIcons} from '../../utils/mg-icons';
import {MgColors} from '../../utils/mgVariables';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'mg-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() public color: string = 'white';
  @Input() public icon: string = '';
  @Input() public height: string = '30';
  @Input() public width: string = '30';
  @Input() public rotate: 'right' | 'left' = 'left';
  public iconHtml!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let color = MgColors.getColor(this.color) ?? this.color;
    this.iconHtml = this.sanitizer.bypassSecurityTrustHtml(MgIcons.getIcon(this.icon, color));
  }

}
