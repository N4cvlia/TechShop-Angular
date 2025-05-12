import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private api: ApiService, private cookie: CookieService) {
    this.getCart()
   }
  
  
  getCart() {
    if(this.cookie.get("User")) {
      this.api.getCart().subscribe({
        next: (data:any) => {
          this.cartNum.next(data.products.length)
        }
      })
      this.api.getAuth().subscribe({
        next: (data:any) => {
          this.cartAvail.next(data.cartID)
          this.authInfo.next(data)
        }
      })
    }
  }

  renewCart() {
    if(this.cookie.get("User")) {
      this.api.getCart().subscribe({
        next: (data:any) => {
          this.cartNum.next(data.products.length)
          console.log(data)
        }
    })
  }
}
  renewPfp() {
    if(this.cookie.get("User")) {
      this.authInfo.subscribe((data: any) => {
        this.authInfos.next(true)
      })
    }
  }

  startLoading() {
    this.loaderLogic.next(true)
  }

  stopLoading() {
    this.loaderLogic.next(false)
  }

  public cartNum: BehaviorSubject<number> = new BehaviorSubject(0);
  public cartAvail: BehaviorSubject<string> = new BehaviorSubject("");
  public authInfo: BehaviorSubject<any> = new BehaviorSubject("")
  public authInfos: BehaviorSubject<any> = new BehaviorSubject("")
  public loaderLogic: BehaviorSubject<boolean> = new BehaviorSubject(false)

  shopaction$ = this.cartNum.asObservable()
}
