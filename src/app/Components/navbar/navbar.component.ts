import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, viewChild} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SubjectsService } from '../../Services/subjects.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, timeout } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @ViewChild('search') search! : ElementRef;
  @ViewChild("profile") profile! : ElementRef;
  private sub!: Subscription;
  private sub2!: Subscription;

  public cartNum: number = 0;
  public auth: string = "";
  public username: string = "";
  public authAvail: boolean = false;
  public searchInput: any = ""
  public searchProducts: any;
  public SearchVisib: any = "none";
  public profileVisib: boolean = false;
  public productsData: any;

  constructor(private subjects: SubjectsService, private cookie: CookieService, private routing: Router, private api: ApiService, private cdr: ChangeDetectorRef){
    this.getCartNum()
  }
  ngOnInit(): void {
    this.getAuth()
    this.sub = this.subjects.shopaction$.subscribe(() => {
      this.getCartNum();
    })
    this.sub2 = this.subjects.loginStatus$.subscribe(() => {
      this.getAuth()
    })
    this.getallProducts();
  }

  @HostListener("document:click", ['$event'])
  onDocumentClick(event : Event) {
    if(!this.search.nativeElement.contains(event.target)){
      this.SearchVisib = "none"
    }
    if(!this.profile.nativeElement.contains(event.target)) {
      this.profileVisib = false
    }
  }

  profileDropdown(event: Event) {
    event.stopPropagation();
    this.profileVisib = !this.profileVisib
  }

  goToProfile() {
    this.routing.navigate(["Profile"])
  }

  getallProducts(): void {
    this.api.getAllAllProducts().subscribe({
      next: (data:any) => {
        this.productsData = data;
      },
      error: (err:any) => {
        console.error("Error fetching products:", err);
      }
    });
  }
  getCartNum() {
    this.subjects.cartNum.subscribe((data:any) => {this.cartNum = data})
    // this.subjects.authInfos.subscribe((data:any) => this.authAvail = data)
  }

  searchUp() {
    this.routing.navigate(["/Details"], {queryParams: {id: this.searchProducts[0]._id}});
    this.searchInput = "";
    this.SearchVisib = "none";
  }

  getAuth() {
    if(this.cookie.get("User")) {
      this.api.getAuth().subscribe(
        {
          next: (data:any) => {
            this.username = `${data.firstName}`
            this.auth = data.avatar;
            this.authAvail = !!this.auth;
          }
        }
      )
    }else {
      this.username = "";
      this.auth = "";
      this.authAvail = false;
    }
  }

  goCart() {
    if(this.cartNum == 0) {
      alert("Add something to cart first!")
    }else {
      this.routing.navigate(["Cart"])
    }
  }
  getSearch() {
    this.searchProducts = this.productsData.products.filter((product: any) => product.title.toLowerCase().includes(this.searchInput.toLowerCase()));
    if(this.searchInput.length > 0) {
      this.SearchVisib = "block"
   }
  }
  goToDetails(data: any) {
    this.routing.navigate(["/Details"], {queryParams: {id: data._id}})
    this.searchInput = ""
    this.SearchVisib = "none";
  }

  logOut(): void {
    this.cookie.set("User", "")
    this.getAuth()
    alert("Succesfully Logged Out!")
    this.profileVisib = false;
    this.cartNum = 0;
    setTimeout(() => {
      this.routing.navigate([""])
    }, 1000);
  }
}
