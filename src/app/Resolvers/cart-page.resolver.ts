import { ResolveFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../Services/api.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


export const cartPageResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ApiService).getCart();
};