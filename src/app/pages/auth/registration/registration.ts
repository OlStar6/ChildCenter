import { NgClass } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IUser, ServerError } from '../../../models/interfaces';
import { UserService } from '../../../services/user-service';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { MessageService } from 'primeng/api';

export const LOCAL_STORAGE_NAME = 'currentUser';

@Component({
  selector: 'app-registration',
  imports: [NgClass,FormsModule, ButtonModule, CheckboxModule, InputTextModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration implements OnInit {
login: string;
psw:string;
repeatPsw:string;
email: string;
isRemember: boolean = false;
labelText = "Сохранить пользователя в хранилище";
saveUserInStore:boolean;
constructor(
  private userService: UserService, 
  private http:HttpClient, 

  ) {}
  
ngOnInit(): void {

  }
 
onAuth(ev: Event):void | boolean {

 /*  if (this.psw !== this.repeatPsw) {
       this.messageService.add({severity: 'error', summary: 'Пароли не совпадают', life: 2000})
       return false;
    }
*/
    const userObj: IUser = {
        login: this.login,
        psw: this.psw,
        email: this.email
    }
    const userJ= {
      login:300,
      psw:300

    }
    this.http.post('http://localhost:3002/users/', userObj).subscribe(()=>{})

           if (!this.userService.isUserExist(userObj)) {
          this.userService.setUser(userObj);

          if (this.saveUserInStore) {
            const objUserJsonStr = JSON.stringify(userObj);
            window.localStorage.setItem('user_' + userObj.login, objUserJsonStr);
          }
           }
     //  this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
 
  }
  /*(err:HttpErrorResponse)=> {
    console.log('err', err)
    const ServerError = <ServerError>err.error;
    this.messageService.add({severity:'warn', summary:ServerError.errorText});
  });*/
}

/*(err:HttpErrorResponse)=> {
    console.log('err', err)
    const ServerError = <ServerError>err.error;
    this.messageService.add({severity:'warn', summary:ServerError.errorText});
  }*/

    /* 
  private messageService: MessageService,
  */
  /* 
  const storedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
   f (storedUser) {
     this.userStorage.push(storedUser);
     this.auth(storedUser)*/

     //this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'})