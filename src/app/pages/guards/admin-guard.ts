import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { UserService } from '../../services/user-service';
import { Roles } from '../../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, 
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredRole = route.data['role'] as Roles;
  const userRole = this.userService.getRole();
  
  if ( userRole === requiredRole) {
    return true;
  }
  
  return this.router.parseUrl(userRole ? '/statistic' : '/glory');
}
}




/*import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../../services/user-service";

export const adminChildGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(UserService);
  const requiredRole = childRoute.data?.['requiredRole'];

  if (!requiredRole) {
    return true;
  }
  const userRole = authService.getRole();
  return userRole === requiredRole;
};*/



