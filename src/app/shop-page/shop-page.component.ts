import { afterNextRender, Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SubjectsService } from '../subjects.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shop-page',
  imports: [CommonModule, FormsModule, NgxSliderModule],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent{
  constructor(private api: ApiService, private routing: Router, private subjects: SubjectsService, private cookie: CookieService){
    this.getAllProducts(1)
    this.getAllCategorys()
    this.getAllBrands()
    this.subjects.renewCart()
    this.subjects.renewCartId()
    this.getCartAvail()
    this.subjects.renewPfp()
  }
  
  public allProducts: any;
  public cartAvail: any;
  public isChecked: any = 'checked';
  public isChecked2: any = 'checked';
  public allProductsData: any;
  public allCategorys: any;
  public allBrands: any;
  public pagination: boolean = true;
  public sideButtons: any = [
    {
      boolean: false
    },
    {
      boolean: false
    },
    {
      boolean: false
    },
    {
      boolean: false
    },
    {
      boolean: false
    }
  ]

  getCartAvail() {
    this.subjects.cartAvail.subscribe((data:any) => {
      this.cartAvail = data
    })
  }

  sidePanel(num:any) {
    this.sideButtons[num].boolean = !this.sideButtons[num].boolean
  }

  getAllProducts(num: any) {
    this.api.getAllProducts(num).subscribe({
      next: (data:any) => {
        this.allProducts = data.products
        this.allProductsData = data
        this.paginNumQuantity = []
        this.paginNum = num
        this.pagination = true
        for(let i = 1;i <= Math.ceil(this.allProductsData.total/this.allProductsData.limit);i++) {
          this.paginNumQuantity.push(i)
          
        }
      }
    })
  }

  goToDetails(data: any) {
    this.routing.navigate(["/Details"], {queryParams: data._id})
  }

  addToCart(id:any) {
    const body = {
      id: id,
      quantity: 1
    }
    if(this.cookie.get("User")) {
          if(this.cartAvail) {
            this.api.addtoCartPatch(body).subscribe({
              next: (data:any) => {
                this.subjects.renewCart()
              },
              error: (data: any) => console.log(data)
            })
          }else {
            this.subjects.cartAvail.next(true)
            this.api.addtoCartPost(body).subscribe({
              next: (data:any) => {
                this.subjects.renewCart()
                this.cartAvail = true
              },
              error: (data: any) => console.log(data)
            })
          }
          alert("Succesfully added to cart!")
    }else {
      this.routing.navigate([""])
    }
    
  }

  public paginNum: number = 1

  public paginNumQuantity: any[] = [];



  paginIncrease() {
    let paginNumQuantity = Math.ceil(this.allProductsData.total/this.allProductsData.limit)
    if(paginNumQuantity > this.paginNum){
      this.paginNum++
      this.api.getAllProducts(this.paginNum).subscribe((data: any) => this.allProducts = data.products)
    }
  }
  paginDecrease() {
    if(this.paginNum > 1) {
      this.paginNum--
      this.api.getAllProducts(this.paginNum).subscribe((data: any) => this.allProducts = data.products)
    }
  }

  getAllCategorys() {
    this.api.getAllCategorys().subscribe((data:any) => {
      this.allCategorys = data
    })
  }

  getAllBrands() {
    this.api.getAllBrands().subscribe((data:any) => {
      this.allBrands = data
    })
  }

  getCategoryId(num: any) {
    this.api.getCategoryId(num).subscribe({
      next: (data:any) => {
        this.allProducts = data.products
        this.pagination = false
        this.isChecked = false
      }
    })
  }

  getBrandId(brand: any) {
    this.api.getBrandId(brand).subscribe({
      next: (data:any) => {
        this.allProducts = data.products;
        this.pagination = false
        this.isChecked = false
      }
    })
  }

  getByRating(num: any) {
    this.api.getAllAllProducts().subscribe({
      next: (data:any) => {
        this.allProducts = data.products.filter((data:any) => data.rating >= num)
        this.pagination = false
        this.isChecked2 = false
      }
    })
  }

  getRating(num:any) {
    return (Math.floor(num *10)/10) * 15 + (Math.floor(num *10)/10) * 2.7
  }
  getRatingNum(num:any) {
    return Math.floor(num *10)/10
  }

  public minRange: number = 50;
  public maxRange: number = 8000;
  public rangeStep: number = 10

  public minVal: number = 1000;
  public maxVal: number = 7000;

  
  options: Options = {
    floor: 50,
    ceil: 8000,
  };

  getPriceFiltered() {
    this.api.getByPriceFilter(this.minVal, this.maxVal).subscribe({
      next: (data:any) => {
        this.allProducts = data.products
        this.pagination = false
        this.isChecked = 'checked'
        this.isChecked2 = 'checked'
      }
    })
  }



}
