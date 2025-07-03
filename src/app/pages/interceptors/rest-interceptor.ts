import {Injectable} from '@angular/core';

import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserService } from '../../services/user-service';

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService {

  constructor(
    private userService: UserService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.token;

    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
