import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faChevronLeft, faChevronRight, faCircleXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { SubjectsService } from '../../Services/subjects.service';
import { CookieService } from 'ngx-cookie-service';
import { skip, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
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
  public id: any;
  public productData: any;
  
  constructor(private detailData: ActivatedRoute, private api : ApiService, private subjects: SubjectsService, private cookie: CookieService){
    this.subjects.renewCartId();
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.productData = this.detailData.snapshot.data["productDetails"];
    this.alocateInfo(this.productData);

    this.detailData.queryParamMap.pipe(
      skip(1),
      switchMap((params: any) => {
        const id = params.get('id');
        if(id){
          return this.api.getProductById(id);
        }
        return of(null);
      })
    ).subscribe((data: any) => {
      this.alocateInfo(data);
    })
  }

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

  alocateInfo(info: any) {
    this.info = info
    this.rating = Math.floor(this.info.rating *10)/10
    this.images = info.images
    this.images.unshift(info.thumbnail)
    this.ratingNum = (Math.floor(this.info.rating *10)/10) * 15 + (Math.floor(this.info.rating *10)/10) * 2.7
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
