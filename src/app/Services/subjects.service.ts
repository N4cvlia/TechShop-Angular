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
    this.getPfp()
   }
  
  
  getCart() {
    if(this.cartAvail.value) {
      if(this.cookie.get("User")) {
        this.api.getCart().subscribe({
          next: (data:any) => {
            this.cartNum.next(data.products.length)
          }
        })
        this.api.getAuth().subscribe({
          next: (data:any) => {
            if(data.cartID) {
              this.cartAvail.next(true)
            }else {
              this.cartAvail.next(false)
            }
            
            this.authInfo.next(data)
          }
        })
      }
    }
    
    
  }


  getPfp() {
    if(this.cookie.get("User")){
      this.api.getAuth().subscribe( (data: any) => {
        this.authInfo.next(data)
      }
      )
    }
    
  }
  renewCart() {
    if(this.cartAvail.value) {
      if(this.cookie.get("User")) {
        this.api.getCart().subscribe({
          next: (data:any) => {
            this.cartNum.next(data.products.length)
          }
      })
    }
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
  public cartAvail: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public authInfo: BehaviorSubject<any> = new BehaviorSubject("")
  public authInfos: BehaviorSubject<any> = new BehaviorSubject("")
  public loaderLogic: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public checkedOut: BehaviorSubject<boolean> = new BehaviorSubject(false)

  renewCartId() {
    if(this.cookie.get("User")) {
      this.api.getAuth().subscribe({
        next: (data:any) => {
          if(data.cartID) {
            this.cartAvail.next(true)
          }else {
            this.cartAvail.next(false)
          }
          this.authInfo.next(data.avatar)
        }
      })
    }
  }

  shopaction$ = this.cartNum.asObservable()
}
