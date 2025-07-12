/*import {Injectable} from '@angular/core';

import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserService } from '../../services/user-service';
import { Role, Roles } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoleInterceptorsService {

  constructor(
    private userService: UserService
  ) {
  }

  intercept(req: HttpResponse<any>, next: Body): Observable<HttpEvent<Roles>> {
    const role = this.userService.role;
   
console.log('request', role)
    if (role) {
      const clonedReq = req.clone({
        body: req.body.set('role', ` ${role}`)
    
      })
      
     return next.handle(clonedReq);
     const clonedRes = res.clone({
        headers: res.
      })
    }
    return next.handle(req);
  }
}
*/