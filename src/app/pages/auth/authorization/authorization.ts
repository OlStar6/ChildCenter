import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './authorization.html',
  styleUrl: './authorization.scss'
})
export class Authorization implements OnInit, OnDestroy {
login: string;
psw: string;


constructor(private http:HttpClient, private router: Router, private userService:UserService) {}
ngOnInit(): void {
  
}

ngOnDestroy(): void {
  
}

onAuth(ev:Event):void {
const user: IUser = {
  login:this.login,
  psw:this.psw,
}
 this.http.post<{access_token:string}>('http://localhost:3002/users/'+user.login, user).subscribe((data)=> {
  this.userService.setUser(user);
  const token: string = data.access_token;
  this.userService.setToken(token);
  this.userService.setToStore(token);
  this.router.navigate(['enter']);
 })

}

}
