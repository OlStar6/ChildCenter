import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { UserService } from '../../../services/user-service';
import { MessageService } from 'primeng/api';
import { IUserRegister } from '../../../models/interfaces';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, NgClass, ButtonModule, Checkbox],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration implements OnInit {
login: string;
password?: string;
psw:string;
repeatPsw:string;
repeatPassword?: string;
email: string;
isRemember: boolean = false;
labelText = "Сохранить пользователя в хранилище";
constructor() {}

ngOnInit(): void {

  }
 
 onAuth(ev:Event) {

console.log('ev', ev);
/*const postObj= {login: this.login, password: this.password} as IUserRegister;
this.userService.registerUser(postObj)
.subscribe(
  ()=>{
    this.initToast('success', 'Регистрация прошла успешно');
  },
 ()=>{
  this.initToast('error', 'Ошибка');
}
)

}
initToast(type: 'error' | 'success', text: string):void {
  this.messageService.add({ severity: type, detail: text, life: 3000}) 
}*/
 }
}