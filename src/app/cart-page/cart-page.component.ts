import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-cart-page',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  constructor(private api: ApiService, private routing: Router, private subjects: SubjectsService) {
    this.getCart()
    this.subjects.renewCartId();
    this.subjects.cartAvail.next(true)
    this.subjects.renewCart();
    
  }

  public id : any;

  public thumbnails: any[] = []

  public products: any;

  public productss: any = {
    total: {
      quantity: 0
    }
  }

  public productsSecond: any[] = []

  public ratings: any;

  public quantitys: any[] = []

  faStar = faStar

  rating(item: any) {
    return Math.floor(item *10)/10
  }

  getCart() {
    this.api.getCart().subscribe({
      next: (data:any) => {
        this.id = data.products.map((data:any) => data.productId)
        this.products = data.products
        this.productss = data
        this.getImages(this.id, data)
        this.subjects.renewCart()
      }
    })

  }
  getImages(data:any, quantity:any) {
    for(let item of data){
      this.api.getProductById(item).subscribe({
        next: (data: any) => {
          this.productsSecond.push(data)
          this.quantitys = quantity.products.map((data:any) => data.quantity)
        }
      })
    }
  }
  deleteProduct(id: any, index: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        accept: 'application/json',
      }),
      body: { id: id }
    }
    this.api.deleteProduct(options).subscribe((data:any) => {
      this.updateTotal()
      this.subjects.renewCart()
      // this.subjects.cartNum.subscribe({
      //   next: (data: any) => {
      //     this.subjects.cartNum.next(data--)
      //   }
      // })
    })
    this.productsSecond.splice(index, 1)
  }

  quantityIncrease(ind : any) {
    if(this.productsSecond[ind].stock > this.quantitys[ind]) {
      this.quantitys[ind]++
      const body = {
        id: this.productsSecond[ind]._id,
        quantity: this.quantitys[ind]
      }
      this.api.addtoCartPatch(body).subscribe({
        next: (data:any) => this.updateTotal()
      })
      
    }
  }

  quantityDecrease(ind: any) {
    if(this.quantitys[ind] > 0) {
      this.quantitys[ind]--
      const body = {
        id: this.productsSecond[ind]._id,
        quantity: this.quantitys[ind]
      }
      this.api.addtoCartPatch(body).subscribe({
        next: (data:any) => this.updateTotal()
      })
    }
  }

  updateTotal() {
    this.api.getCart().subscribe({
      next: (data:any) => {
        this.productss = data
      }
    })
  }

  checkout() {
    this.api.checkuut().subscribe({
      next: (data: any) => {      
        this.subjects.cartNum.next(0)
        this.subjects.cartAvail.next(false)
        alert("Succesfully checked out!")
        setTimeout(() => {
          this.routing.navigate(["Shop"])
        }, 1500);
        
      }
    })

  }
}
