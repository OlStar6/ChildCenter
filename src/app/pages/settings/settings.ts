import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IUser } from '../../models/interfaces';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, ButtonModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  user:IUser;
  
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
