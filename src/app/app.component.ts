import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SubjectsService } from './Services/subjects.service';
import { LoaderComponent } from './Components/loader/loader.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AngularShopProject';

  public loading: boolean = false

  constructor(private subjects: SubjectsService, public cookies : CookieService) {
    this.logOutLogic()
  }
  ngOnInit(): void {
    this.loaderLogic()
  }

  logOutLogic() {
    setInterval(() => {
      this.cookies.set("User", "")
    }, 600000);
  }

  loaderLogic() {
    this.subjects.loaderLogic.subscribe( (data:boolean) => {
      this.loading = data
    } )
  }
}
