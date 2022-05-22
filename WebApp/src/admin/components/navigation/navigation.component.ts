import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mg-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  routes: {name: string, link: string}[] = [
    {name: 'Новости', link: 'news'},
    {name: 'Формы', link: 'orders'},
    {name: 'Иструктора', link: 'masters'},
    {name: 'Филиалы', link: 'locations'},
    {name: 'Направления', link: 'sections'},
    // {name: 'Настройки', link: 'settings'},
    {name: 'Пользователи', link: 'users'},
    {name: 'Расписание', link: 'schedule'},
    {name: 'События', link: 'events'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
