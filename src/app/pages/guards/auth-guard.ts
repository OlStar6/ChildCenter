import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ToastService } from '../../services/toast';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);
   const  toastService =inject(ToastService);

  const isAuth = !!userService.getUsersStorage();

  if (!isAuth) {
    toastService.show('success', 'Для просмотра этой страницы необходимо авторизоваться');
     router.navigate(['auth']);
  return false
   

  } else {
    return true;
  }

}




