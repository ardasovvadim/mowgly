import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'mg-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AvatarComponent implements OnInit {

  @Input() size: number = 64;
  error: boolean = false;

  @Input() set image(value: string) {
    this.imageUrl = value;
    this.error = false;
  }

  imageUrl?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
