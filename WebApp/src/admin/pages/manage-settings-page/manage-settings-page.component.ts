import { Component, OnInit } from '@angular/core';
import {TelegramApiService} from '../../services/telegram-api.service';
import {TelegramStatus} from '../../models/telegram.model';
import {mgSuccessNotification} from '../../../app/utils/ui-kit';

@Component({
  selector: 'mg-manage-settings-page',
  templateUrl: './manage-settings-page.component.html',
  styleUrls: ['./manage-settings-page.component.scss'],
  providers: [
      TelegramApiService
  ]
})
export class ManageSettingsPageComponent implements OnInit {

  telegramStatus: TelegramStatus = {} as TelegramStatus;

  constructor(
      private readonly telegramApi: TelegramApiService
  ) { }

  ngOnInit(): void {
    this.refreshTelegram();
  }

  resetTelegram() {
    this.telegramApi.reset().subscribe(() => {
      mgSuccessNotification("Telegram settings were reset");
      this.refreshTelegram();
    })
  }

  refreshTelegram() {
    this.telegramApi.getStatus().subscribe(data => this.telegramStatus = data);
  }
}
