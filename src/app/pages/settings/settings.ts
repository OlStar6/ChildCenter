import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, ButtonModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
menuItems = [
  {
    path: 'statistic',
    label: 'Статистика'
  },
   {
    path: 'changePsw',
    label: 'Смена пароля'
  }
]

}
