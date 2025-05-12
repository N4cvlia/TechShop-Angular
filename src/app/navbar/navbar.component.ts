import { Component, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SubjectsService } from '../subjects.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private subjects: SubjectsService, private cookie: CookieService, private routing: Router, private api: ApiService){
    this.getCartNum()
    this.getAuth()
  }

  private sub!: Subscription;
  private sub2!: Subscription

  public cartNum: number = 0;
  public auth: any = {
    avatar: ""
  }
  public authAvail: boolean = false;
  public searchInput: any = ""
  public searchProducts: any;

  getCartNum() {
    this.subjects.cartNum.subscribe((data:any) => {this.cartNum = data})
    this.subjects.authInfos.subscribe((data:any) => this.authAvail = data)
  }

  getAuth() {
    if(this.cookie.get("User")) {
      this.subjects.authInfo.subscribe((data: any) => {
        this.auth = data
        this.authAvail = true
      })
    }
  }

  goCart() {
    if(this.cartNum == 0) {
      alert("Add something to cart first!")
    }else {
      this.routing.navigate(["Cart"])
    }
  }
  
  ngOnInIt() {
    this.sub = this.subjects.shopaction$.subscribe(() => {
      this.getCartNum()
    })
  }

  getSearch() {
    this.api.getAllAllProducts().subscribe({
      next: (data:any) => {
        this.searchProducts = data.products.filter((product: any) => product.title.toLowerCase().includes(this.searchInput.toLowerCase()))
      }
    })
  }
  goToDetails(data: any) {
    this.routing.navigate(["/Details"], {queryParams: data._id})
    this.searchInput = ""
  }
}
