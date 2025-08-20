import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { SubjectsService } from '../../Services/subjects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private api: ApiService, private cookie: CookieService, public routing: Router, private subjects: SubjectsService) {
    window.scrollTo(0, 0);
  }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>("", [
      Validators.required
    ])
  })

  public succ: boolean = false;
  public err: boolean = false;

  login() {
    this.api.signIn(this.loginForm.value).subscribe({
      next: (data:any) => {
        this.cookie.set("User", data.access_token),
        setTimeout(() => {
          
          this.routing.navigate([""], {skipLocationChange: true})
          
        }, 3000);
        this.succ = true
        this.err = false;
        this.subjects.getCart()
        this.subjects.renewPfp()
        this.subjects.notifyLogin();
      },
      error: (data:any) => {
        this.err = true;
      }
    })
  }
}
