import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SubjectsService } from './subjects.service';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularShopProject';

  constructor(private subjects: SubjectsService) {
    this.loaderLogic()
  }

  public loading: boolean = false


  loaderLogic() {
    this.subjects.loaderLogic.subscribe( (data:boolean) => {
      this.loading = data
    } )
  }
}
