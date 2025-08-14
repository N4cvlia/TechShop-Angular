import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { SubjectsService } from '../../Services/subjects.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private api: ApiService, private cookie: CookieService, public routing: Router, private subjects: SubjectsService) {}

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>(""),
    password: new FormControl<string>("")
  })

  public succ: boolean = false

  login() {
    this.api.signIn(this.loginForm.value).subscribe({
      next: (data:any) => {
        this.cookie.set("User", data.access_token),
        setTimeout(() => {
          
          this.routing.navigate([""], {skipLocationChange: true})
          
        }, 3000);
        this.succ = true
        this.subjects.getCart()
        this.subjects.renewPfp()
      },
      error: (data:any) => {
        console.log(data)
      }
    })
  }
}
