import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-service';
//import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule, RouterLink],
  templateUrl: './authorization.html',
  styleUrl: './authorization.scss'
})
export class Authorization implements OnInit, OnDestroy {
login: string;
psw: string;
id:string


constructor(private http:HttpClient, 
  private router: Router, 
  private userService:UserService, 

) {}
ngOnInit(): void {
  
}

ngOnDestroy(): void {
  
}

onAuth(ev:Event):void {
const user: IUser = {
  login:this.login,
  psw:this.psw,
}
 this.http.post<{access_token:string, id:string}>('http://localhost:3002/users/'+user.login, user).subscribe((data)=> {
 user.id = data.id;
  this.userService.setUser(user);
  const token: string = data.access_token;
  this.userService.setToken(token);
  this.userService.setToStore(token);
  this.router.navigate(['/']);
 },
 /*(err:HttpErrorResponse)=>{
  const ServerError = <ServerError>err.error;
  this.messageService.add({severity:'warn', summary:ServerError.errorText});
 }*/
);

}

}
