import {Injectable} from '@angular/core';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserService } from '../../services/user-service';


@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.token;
   
console.log('request', token)
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    
      })
      return next.handle(cloned);
       } else {return next.handle(req);}
    }
    
  }

