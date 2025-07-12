
import {HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";


export const ErrorInterceptorsService: HttpInterceptorFn = ( req: HttpRequest<unknown>, next) =>{
  console.log('request', req);
  return next(req).pipe(
    tap((req)=>{
      console.log('response', req)
    })
 ,
  catchError((err)=> {
    console.log('err', err);
    return throwError(()=> err);
  })
)
}


