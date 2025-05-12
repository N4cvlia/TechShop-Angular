import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faChevronLeft, faChevronRight, faCircleXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { SubjectsService } from '../subjects.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-page',
  imports: [FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  constructor(private detailData: ActivatedRoute, private api : ApiService, private subjects: SubjectsService, private cookie: CookieService){
    this.getId()
  }
  faStar = faStar
  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft
  faCheckCircle = faCheckCircle
  faCircleXmark = faCircleXmark

  public info : any = {
    title: ""
  }

  public rating: any;

  public images: any;
  
  public imageNum: number = 0;

  public quantityNum: number = 1;

  public ratingNum: any;

  quantityNumIncrease() {
    if(this.info.stock > this.quantityNum) {
      this.quantityNum++
    }
  }
  quantityNumDecrease() {
    if(this.quantityNum > 1) {
      this.quantityNum--
    }
  }

  imageNumIncrease() {
    if(this.images.length - 1 > this.imageNum) {
      this.imageNum++
    }
  }

  imageNumDecreae() {
    if(this.imageNum > 0) {
      this.imageNum--
    }
  }

  getId() {
    this.detailData.queryParams.subscribe((data: any) => {
      this.getDetailsById(Object.values(data).join(""))
    })
  }

  getDetailsById(id: any) {
    this.api.getProductById(id).subscribe({
      next: (data:any) => {
        this.info = data
        this.rating = Math.floor(this.info.rating *10)/10
        this.images = data.images
        this.images.unshift(data.thumbnail)
        this.ratingNum = (Math.floor(this.info.rating *10)/10) * 15 + (Math.floor(this.info.rating *10)/10) * 2.7
      }
    })
  }
  

  addToCart(id:any) {
    const body = {
      id: id,
      quantity: this.quantityNum
    }
    if(this.cookie.get("User")) {
      if(this.info.stock > 0) {
        this.subjects.cartAvail.subscribe({
          next: (data: any) => {
            if(data) {
              this.api.addtoCartPatch(body).subscribe({
                next: () => {
                }
              })
            }else {
              this.api.addtoCartPost(body).subscribe({
                next: () => {}})
            }
          }
        })
      }
    }else {
      alert("Login before adding items to cart!")
    }
    
  }
  
}
