import { Component, OnInit } from '@angular/core';
import {MasterCardInfoModel} from '../../models/master-card-info.model';

@Component({
  selector: 'mg-master-slider',
  templateUrl: './master-slider.component.html',
  styleUrls: ['./master-slider.component.scss']
})
export class MasterSliderComponent implements OnInit {

  masters: MasterCardInfoModel[] = [
    {
      imgUrl: 'assets/img/masters/master-4.png',
      name: 'Волощенко Евгения Константиновна',
      achievements: [
        'Кандидат в Мастера спорта Украины',
        'Чемпионка Украины по каратэ',
        'Призер Международных турниров'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-2.png',
      name: 'Цискарадзе Амиран Автандилович',
      achievements: [
        'Мастер Спорта СССР по борьбе',
        'Черный пояс кэмпо-джитсу, кэмпо-кай',
        'Черный пояс 3 Дан Пангратион'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-2.png',
      name: 'Цискарадзе Амиран Автандилович',
      achievements: [
        'Мастер Спорта СССР по борьбе',
        'Черный пояс кэмпо-джитсу, кэмпо-кай',
        'Черный пояс 3 Дан Пангратион'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-4.png',
      name: 'Волощенко Евгения Константиновна',
      achievements: [
        'Кандидат в Мастера спорта Украины',
        'Чемпионка Украины по каратэ',
        'Призер Международных турниров'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-2.png',
      name: 'Цискарадзе Амиран Автандилович',
      achievements: [
        'Мастер Спорта СССР по борьбе',
        'Черный пояс кэмпо-джитсу, кэмпо-кай',
        'Черный пояс 3 Дан Пангратион'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-2.png',
      name: 'Цискарадзе Амиран Автандилович',
      achievements: [
        'Мастер Спорта СССР по борьбе',
        'Черный пояс кэмпо-джитсу, кэмпо-кай',
        'Черный пояс 3 Дан Пангратион'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-4.png',
      name: 'Волощенко Евгения Константиновна',
      achievements: [
        'Кандидат в Мастера спорта Украины',
        'Чемпионка Украины по каратэ',
        'Призер Международных турниров'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-2.png',
      name: 'Цискарадзе Амиран Автандилович',
      achievements: [
        'Мастер Спорта СССР по борьбе',
        'Черный пояс кэмпо-джитсу, кэмпо-кай',
        'Черный пояс 3 Дан Пангратион'
      ]
    },
    {
      imgUrl: 'assets/img/masters/master-2.png',
      name: 'Цискарадзе Амиран Автандилович',
      achievements: [
        'Мастер Спорта СССР по борьбе',
        'Черный пояс кэмпо-джитсу, кэмпо-кай',
        'Черный пояс 3 Дан Пангратион'
      ]
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
