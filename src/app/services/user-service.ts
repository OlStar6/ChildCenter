import { Injectable } from '@angular/core';
import { IUser } from '../models/interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export const LOCAL_STORAGE_NAME = 'currentUser';
@Injectable({
  providedIn: 'root'
})
export class UserService {
private currentUser: IUser | null = null;
  constructor(
    private router: Router,
private http: HttpClient
  ) { }

  registerUser(user:IUser) {

  }
 /* getUser(): IUser {
const 
  }

    logout() {
    this.userStorage = this.userStorage.filter(({login}) => login === this.currentUser?.login);
    this.currentUser = null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.router.navigate(['auth']);
  }*/
  }

