import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'mg-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAvatarComponent implements OnInit {

  @Input() size: number = 64;

  avatar$: Observable<string> = this.userService.profile$.pipe(map(profile => profile?.profiles?.find(p => p.name == 'UserAvatar')?.value))

  constructor(
      private readonly userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
