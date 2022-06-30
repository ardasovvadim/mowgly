import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../app/services/user.service';

@Component({
  selector: 'mg-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private originRoutes: {name: string, link: string, permission: string}[] = [
    {name: 'Новини', link: 'news', permission: 'Permission.News.Get'},
    {name: 'Форми', link: 'orders', permission: null},
    {name: 'Інструктора', link: 'masters', permission: 'Permission.Master.Get'},
    {name: 'Філіали', link: 'locations', permission: 'Permission.Location.Get'},
    {name: 'Напрямки', link: 'sections', permission: 'Permission.Section.Get'},
    {name: 'Користувачі', link: 'users', permission: 'Permission.User.Get'},
    {name: 'Розклад', link: 'schedule', permission: 'Permission.TimetableRecord.Get'},
    {name: 'Події', link: 'events', permission: 'Permission.Event.Get'},
    {name: 'Права', link: 'permissions', permission: 'Permission.Role.Get'},
  ]

  routes: {name: string, link: string, permission: string}[];

    constructor(
      private readonly userService: UserService
  ) {
    userService.profile$.subscribe(profile => {
      this.routes = this.originRoutes.filter(r => !r.permission || profile.permissions.includes(r.permission))
    })
  }

  ngOnInit(): void {
  }

}
