import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../Services/user-auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let auth = inject(UserAuthService)
  let router = inject(Router)
  let x;
  auth.loggeedProp.subscribe((data)=>
    x = data)
 if (x) {
  
  return true;
  
 } 
 else {

   router.navigate(['main/signup'])
   return false;
  
 }
};
