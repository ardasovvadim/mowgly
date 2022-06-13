import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../app/services/user.service';

@Component({
  selector: 'mg-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private originRoutes: {name: string, link: string, permission: string}[] = [
    {name: 'Новости', link: 'news', permission: 'Permission.News.Get'},
    {name: 'Формы', link: 'orders', permission: null},
    {name: 'Иструктора', link: 'masters', permission: 'Permission.Master.Get'},
    {name: 'Филиалы', link: 'locations', permission: 'Permission.Location.Get'},
    {name: 'Направления', link: 'sections', permission: 'Permission.Section.Get'},
    {name: 'Пользователи', link: 'users', permission: 'Permission.User.Get'},
    {name: 'Расписание', link: 'schedule', permission: 'Permission.TimetableRecord.Get'},
    {name: 'События', link: 'events', permission: 'Permission.Event.Get'},
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
