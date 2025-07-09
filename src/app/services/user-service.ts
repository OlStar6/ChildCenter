import { Injectable } from '@angular/core';
import { IUser, UserStorageKey } from '../models/interfaces';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export const LOCAL_STORAGE_NAME = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;
  private currentUserRole: string;
  newPsw: string;
  oldPsw:string;
  token: string | null;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
   
  }
 /* //регистр
   register(user: IUser): boolean {  //добавляем в localstorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.find((u:IUser) => u.login === user.login)) {
      return false;
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
        return true;
  }
  //авторизация
  login(login:string, psw: string): boolean{
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u:IUser) => u.login===user.login && u.psw === user.psw);
if (user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
return true;
}
return false;
 }

 logout():void{
  sessionStorage.removeItem('currentUser')
 }
 isLoggedIn():boolean {
  return sessionStorage.getItem('currentUser') !== null; //получаем авторизован ли пользователь, неравный null
 }
 getCurrentUser():IUser {
  return JSON.parse(sessionStorage.getItem('currentUser') || null); //получаем текущего пользователь или null
 }
*/
  getUser(login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;

  }
  setUser(user: IUser): void {
    this.currentUser = user;
    sessionStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ login: user.login }));  //добавляем в sessionStorage
      console.log('login', user)
  }
  setUserLocal(user: IUser): void {
    this.currentUser = user;
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ login: user.login }));
       //добавляем в localStorage
  }
  
  getUsersStorage(): IUser {
    const userFromStorage = sessionStorage.getItem(UserStorageKey);
    return this.currentUser || JSON.parse(userFromStorage);

  }
 /* private auth(user: IUser, isRememberMe?: boolean) {
    console.log('user', user)
    this.currentUser = user;
    this.router.navigate([''])
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));

  }

  

  private authAndRedirect(user: IUser, isRememberMe?: boolean) {
    this.auth(user, isRememberMe);
    this.router.navigate(['enters']);
  }*/

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
    window.localStorage.removeItem('usertoken');
   sessionStorage.removeItem('userlogin')
  }
 /* authUser(login: string, psw: string, isRememberMe: boolean): true | string {
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
  }*/
  logout() {
    this.userStorage = this.userStorage.filter(({ login }) => login === this.currentUser?.login);
    this.currentUser = null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.router.navigate(['/enters']);
  }
  getRole(): string | null {
    return this.currentUserRole;
  }
  setUserRole(role: string) {
    this.currentUserRole = role;
  }
  isAdmin():boolean {
   return this.currentUserRole === 'admin';
     
  }
  changePassword(login:string, oldPsw:string, newPsw: string): Observable<any> {
     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const pswObj: IUser = {
           oldPsw: this.oldPsw,
           newPsw: this.newPsw,
         
          }
   
    return this.http.put('http://localhost:3002/users/', pswObj, {headers})
    .pipe(
      catchError(error => {
        return throwError(()=> this.handleError(error));
        })
    );
  }
  private handleError(error:any): string {
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.status === 401) {
      return 'Неверный текущий пароль';
    }
if (error.status === 404) {
      return 'Пользователь не найден';
    }
       return 'Произошла ошибка при изменении пароля';
  }
 /* changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(
      `${this.apiUrl}/auth/change-password`,
      { oldPassword, newPassword },
      { headers }
    );
  }*/
}


 /* login(user: { login: string, psw: string }) {
    if (user.login === 'login') {
      this.currentUserRole === 'admin';
      return true;
    }
    return false;
  }
    
   const storagedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
    if (storagedUser) {
      this.userStorage.push(storagedUser);
      this.auth(storagedUser)
    }*/