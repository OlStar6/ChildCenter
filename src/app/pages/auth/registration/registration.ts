import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { UserService } from '../../../services/user-service';
import { MessageService } from 'primeng/api';
import { IUser, IUserRegister, ServerError } from '../../../models/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
constructor(private messageService: MessageService, private http: HttpClient) {}

ngOnInit(): void {

  }
 
 onAuth(ev: Event):void | boolean {

    if (this.psw !== this.repeatPsw) {
       this.messageService.add({severity: 'error', summary: 'Пароли не совпадают', life: 2001})
       return false;
    }

    const userObj: IUser = {
      psw: this.password,
      login: this.login,
      email: this.email
    }
    this.http.post('http://localhost:3001/users/'+userObj.login, userObj).subscribe(
      (data)=>{this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
 
  }, );
}
}
/*(err:HttpErrorResponse)=> {
    console.log('err', err)
    const ServerError = <ServerError>err.error;
    this.messageService.add({severity:'warn', summary:ServerError.errorText});
  }*/