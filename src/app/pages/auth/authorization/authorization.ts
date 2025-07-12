import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IUser, Roles } from '../../../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { ToastService } from '../../../services/toast';
import { tap } from 'rxjs';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule, RouterLink],
  templateUrl: './authorization.html',
  styleUrl: './authorization.scss'
})
export class Authorization implements OnInit, OnDestroy {
   
  login: string;
  psw: string;
  id: string;
  role: Roles;

  constructor(private http: HttpClient,
    private router: Router,
    private userService: UserService,
private toastService: ToastService


  ) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
  onAuth(ev: Event): void {
    const user: IUser = {
      login: this.login,
      psw: this.psw,
    }
    this.http.post<{ access_token: string, id: string, role: Roles }>('http://localhost:3002/users/' + user.login, user).subscribe((data) => {
      user.id = data.id;
      this.userService.setUser(user); //добавляем в sessionStorage
      const token: string = data.access_token;
      const role: Roles = user.role
      this.userService.setToken(token);
      this.userService.setToStore(token);
      this.userService.setToRole(role);
      this.toastService.show('success', 'Успешная авторизация');
      this.router.navigate(['enters']);
    },
    () => {
        this.toastService.show('error', 'Пользователь не найден в базе');
    }
    ),
  tap((response:IUser)=>{
    if(!response.role){
    throw new Error('нет роли');
  }
  this.userService.setToRole('admin');
  })

  }

}
//alert(ServerError.errorText)
/*(err: HttpErrorResponse) => {
        const ServerError = <ServerError>err.error;
       this.messageService.add({severity:'warn', summary:ServerError.errorText}); 
      },*/ 