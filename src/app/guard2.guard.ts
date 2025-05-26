import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guard2Guard: CanActivateFn = (route, state) => {
  let cookies = inject(CookieService);
  if(cookies.get("User")) {
    return true;
  }
  else {
    window.history.back();
    return false
  }
};
