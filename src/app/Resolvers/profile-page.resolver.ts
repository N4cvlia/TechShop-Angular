import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { inject } from '@angular/core';

export const profilePageResolver: ResolveFn<any> = 
(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ApiService).getAuth()
};
