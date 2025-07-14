import { Injectable, OnDestroy } from '@angular/core';
import { Changepsw, ChangePswResponse, IUser, Role, Roles, UserStorageKey } from '../models/interfaces';
import { Router } from '@angular/router';
import {  BehaviorSubject, Observable, Subject, Subscription, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export const LOCAL_STORAGE_NAME = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
private currentUserSubject = new BehaviorSubject<IUser | null>(null);
currentUser$ = this.currentUserSubject.asObservable;

  private userStorage: IUser[] = [];
  user:IUser;
  role:Roles;
  private currentUser: IUser | null = null;
  private currentUserRole?: Roles;
  newPsw: string;
  oldPsw:string;
  login:string;
  token: string | null;
//private auth = false;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
   
  }
 ngOnDestroy(): void {
   
 }
   getUser(login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;

  }

setRole(user: IUser): void {
  this.currentUserSubject.next(user);
  localStorage.setItem('currentUser', JSON.stringify(user));
  console.log('user', user)
}
getCurrentUser(): IUser | null {
  if (!this.currentUserSubject.value) {
    const user = localStorage.getItem(LOCAL_STORAGE_NAME);
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
    console.log('user',user)
  }
  return this.currentUserSubject.value;
}




    setRoleasToken(role:Roles): void {
    this.role = role;
    console.log('role', role)
  }
  getRole(): Roles | undefined {
    return this.getCurrentUser()?.role;
     } 

  isAdmin():boolean {
   return this.role === 'admin';
   }
  
  setToStoreRole(role:Roles) {
    window.localStorage.setItem('role', role);
  }

 /*setRole(role: IUser): void {
     this.user = role;
  }
  setToRole(role: Roles) {
    window.localStorage.setItem('role', role)
  }*/
    /*this.currentUserSubject.next(user);
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ user }));  //добавляем в localStorage
      console.log('role', user)
  }*/
/*getCurrentRole(): IUser | null{
  if (!this.currentUserSubject.value) {
    const role = localStorage.getItem(LOCAL_STORAGE_NAME);
    if(role) {
this.currentUserSubject.next(JSON.parse(role));

    }
  }
  return this.currentUserSubject.value;
}
getRole(): Roles | undefined {
    return this.getCurrentRole().role;
     } 
 
  setUserRole(role: Roles) {
    this.currentUserRole = role;
     console.log('role', role)
    
  }
  hasRole(requiredRole:string):boolean{
    return this.getRole() === requiredRole;
  }
  isAdmin():boolean {
   return this.getRole() === 'admin';
   }
isUser():boolean {
   return this.getRole() === 'user';
   }
clearUser(): void{
  this.currentUserSubject.next(null);
  localStorage.removeItem(LOCAL_STORAGE_NAME);
}
  getRoleUser() {
         return this.http.get<Role[]>("http://localhost:3002/users/")
        
    }


  fetchUserRole(): Observable<Roles> {
    
    return this.http.get<Roles>('http://localhost:3002/users/role').pipe(
      tap(role => this.currentUserRole = role)
      
    
    );
    
  }

*/

  setUser(user: IUser): void {
    this.currentUser = user;
    sessionStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ login: user.login, role: user.role }));  //добавляем в sessionStorage
      console.log('user, login, role', user)
  }
  /*setUserLocal(user: IUser): void {
    this.currentUser = user;
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ login: user.login }));
       //добавляем в localStorage
  }*/
  
  getUsersStorage(): IUser {
    const userFromStorage = sessionStorage.getItem(UserStorageKey);
    return this.currentUser || JSON.parse(userFromStorage);

  }
  private auth(user: IUser, isRememberMe?: boolean) {
    console.log('user', user)
    this.currentUser = user;
    this.router.navigate([''])
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));

  }

  private authAndRedirect(user: IUser, isRememberMe?: boolean) {
    this.auth(user, isRememberMe);
    this.router.navigate(['enters']);

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
  /*get user(): IUser | null {
    return this.currentUser;
  }
  get Token(): string | null {
    return this.isAuthenticated ? 'my-token' : null;
  }*/
  setToken(token: string): void {
    this.token = token;
  }
  setToStore(token: string) {
    window.localStorage.setItem('usertoken', token)
  }

 /* getFromStore() {
    window.localStorage.getItem('usertoken');
  }

  getAllToken(): string | null | void {
    if (this.token) {
      return this.token;
    } else {
      return this.getFromStore()
    }
  }*/
  removeUser(): void {
    this.currentUser = null;
    this.token = null;
    this.role = null;
    window.localStorage.removeItem('usertoken');
   window.sessionStorage.removeItem('currentUser');

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
 
  
 
 changePassword(oldPsw:Changepsw, newPsw:Changepsw): Observable<ChangePswResponse> {
   const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
    });
    console.log('token', headers)
    return this.http.put<ChangePswResponse>(
      'http://localhost:3002/users/change-password',
      {oldPsw, newPsw},
      {headers}
    );
  }
   /* changePassword(oldPsw:string, newPsw: string): Observable<IUser> {
     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
 
    const pswObj: IUser = {
           oldPsw: this.oldPsw,
           newPsw: this.newPsw,
         
          }
   
    return this.http.put('http://localhost:3002/users/'+ this.user.login,
       {newPsw},
       {headers})
    }*/
   /* .pipe(
      catchError(error => {
        return throwError(()=> this.handleError(error));
        })
    );
  }
  handleError(error:any): string {
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
  }*/

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