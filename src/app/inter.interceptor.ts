import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubjectsService } from './Services/subjects.service';
import { finalize } from 'rxjs';

export const interInterceptor: HttpInterceptorFn = (req, next) => {

  let cookie = inject(CookieService)
  let spinner = inject(SubjectsService)

  spinner.startLoading()

  const auth = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${cookie.get("User")}`)
  })
  return next(auth).pipe(
    finalize(() => {
      spinner.stopLoading()
    })
  );
};
