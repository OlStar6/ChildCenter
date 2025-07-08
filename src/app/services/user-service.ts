import { Injectable } from '@angular/core';
import { IUser, UserStorageKey } from '../models/interfaces';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export const LOCAL_STORAGE_NAME = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;
  private currentUserRole: string;
  newPassword: string;
  token: string | null;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const storagedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
    if (storagedUser) {
      this.userStorage.push(storagedUser);
      this.auth(storagedUser)
    }
  }

  getUser(login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;
  }
  setUs(role: string) {
    this.currentUserRole = role;
  }
  getUsersStorage(): IUser {
    const userFromStorage = sessionStorage.getItem(UserStorageKey);
    /*
      if (!this.currentUser) {
        this.userFromStorage()
       */
    return this.currentUser || JSON.parse(userFromStorage);

  }
  private auth(user: IUser, isRememberMe?: boolean) {
    console.log('user', user)
    this.currentUser = user;
    this.router.navigate([''])

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));

  }

  setUser(user: IUser): void {
    this.currentUser = user;
    sessionStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ login: user.login }));
  }

  private authAndRedirect(user: IUser, isRememberMe?: boolean) {
    this.auth(user, isRememberMe);
    this.router.navigate(['']);
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser || !!localStorage.getItem(LOCAL_STORAGE_NAME);
  }
  get isUserInStore(): boolean {
    return !!localStorage.getItem(LOCAL_STORAGE_NAME);
  }

  //для регистрации
  isUserExist(user: IUser) {
    return !!this.currentUser || !!localStorage.getItem(LOCAL_STORAGE_NAME);
  }
  saveUserInStore(): boolean {
    return !!localStorage.getItem(LOCAL_STORAGE_NAME);
  }
  get user(): IUser | null {
    return this.currentUser;
  }
  get Token(): string | null {
    return this.isAuthenticated ? 'my-token' : null;
  }
  setToken(token: string): void {
    this.token = token;
  }
  setToStore(token: string) {
    window.localStorage.setItem('usertoken', token)
  }
  getFromStore() {
    window.localStorage.getItem('usertoken');
  }

  getAllToken(): string | null | void {
    if (this.token) {
      return this.token;
    } else {
      return this.getFromStore()
    }
  }
  removeUser(): void {
    this.currentUser = null;
    this.token = null;
    window.localStorage.removeItem('usertoken')
  }
  authUser(login: string, psw: string, isRememberMe: boolean): true | string {
    const user = this.getUser(login);
    if (!user) {
      return 'User not found';
    }
    if (user.psw !== psw) {
      return 'Wrong password';
    }
    this.authAndRedirect(user, isRememberMe)
    return true;
  }
  addUser(user: IUser, isRememberMe?: boolean): true | string {
    if (this.getUser(user.login)) {
      return 'User already exists';
    }
    this.userStorage.push(user);
    this.authAndRedirect(user, isRememberMe)
    return true;
  }
  logout() {
    this.userStorage = this.userStorage.filter(({ login }) => login === this.currentUser?.login);
    this.currentUser = null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.router.navigate(['/enters']);
  }
  getRole(): string {
    return this.currentUserRole;
  }
  isAdmin() {
   return this.currentUserRole === 'admin';
     
  }
  changePassword(newPassword: string): Observable<IUser> {
    const newPas: IUser = {
      newPassword: this.newPassword
    }
    return this.http.put<IUser>('http://localhost:3002/users/', newPas)
  }
}


 /* login(user: { login: string, psw: string }) {
    if (user.login === 'login') {
      this.currentUserRole === 'admin';
      return true;
    }
    return false;
  }*/