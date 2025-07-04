/*import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { UserService } from '../../services/user-service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuth = !!userService.getUsersStorage();

  if (!isAuth) {
    router.navigate(['auth']);
    return false;
  } else {
    return true;
  }

 CanvasCaptureMediaStreamTrack():boolean{
  if (this.userService.isAdmin()){
    return true;
  } else {
    this.router.navigate(['/'])
  }
}
};
*/




