import { Component } from '@angular/core';
import { Authorization } from './authorization/authorization';
import { Registration } from './registration/registration';
import { TabsModule } from 'primeng/tabs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  imports: [Authorization, Registration, TabsModule],
    providers: [MessageService],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {

}
