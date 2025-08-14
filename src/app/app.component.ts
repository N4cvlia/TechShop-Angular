import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'AngularShopProject';

  constructor(private subjects: SubjectsService, public cookies : CookieService) {
    this.loaderLogic()
    this.logOutLogic()
  }

  public loading: boolean = false

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
