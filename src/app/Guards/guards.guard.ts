import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guardsGuard: CanActivateFn = (route, state) => {
  let cookies = inject(CookieService)
  if(cookies.get("User")) {
    window.history.back()
    return false
  }else {
    return true
  }


};
