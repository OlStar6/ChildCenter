import {Injectable} from '@angular/core';

import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserService } from '../../services/user-service';
import { Roles } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService {

  constructor(
    private userService: UserService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler, res:HttpResponse<Roles>): Observable<HttpEvent<any>> {
    const token = this.userService.token;
   // const role = this.userService.role;
console.log('request', token)
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    
      })
   /*   return next.handle(clonedReq);
      const clonedRes = res.clone({
        headers: res.
      })*/
    }
    return next.handle(req);
  }
}
