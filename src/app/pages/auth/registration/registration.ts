import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IUser } from '../../../models/interfaces';
import { UserService } from '../../../services/user-service';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


export const LOCAL_STORAGE_NAME = 'currentUser';

@Component({
  selector: 'app-registration',
  imports: [NgClass, FormsModule, ButtonModule, CheckboxModule, InputTextModule, CommonModule],

  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration implements OnInit {
  login: string;
  psw: string;
  repeatPsw: string;
  email: string;
  isRemember: boolean = false;
  labelText = "Сохранить пользователя в хранилище";
  saveUserInStore: boolean;
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  onAuth(ev: Event): void | boolean {

    const userObj: IUser = {
      login: this.login,
      psw: this.psw,
      email: this.email
    }
    this.http.post('http://localhost:3002/users/', userObj).subscribe(

      () => {
        this.router.navigate(['/enters']);
      },
     )

    if (!this.userService.isUserExist(userObj)) {
      this.userService.setUser(userObj);

      if (this.saveUserInStore) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_' + userObj.login, objUserJsonStr);
      }
    }
  }

  /* if (this.psw !== this.repeatPsw) {
  alert ('Пароли не совпадают')
    return false;
  }*/

  /*initToast(type: 'error' | 'success', text: string):void {
    this.messageService.add({ severity: type, detail: text, life: 3000}) 
  }
  */

  /*()=>(err:HttpErrorResponse)=> {
    console.log('err', err)
    const ServerError = <ServerError>err.error;
    this.messageService.add({severity:'warn', summary:ServerError.errorText})*/


}



