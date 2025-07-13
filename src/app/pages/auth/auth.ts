import { Component } from '@angular/core';
import { Authorization } from './authorization/authorization';
import { Registration } from './registration/registration';
import { TabsModule } from 'primeng/tabs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [Authorization, Registration, TabsModule, ButtonModule, RouterLink],
    providers: [MessageService],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {

}
