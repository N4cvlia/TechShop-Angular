import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  constructor(private api: ApiService, private routing: Router) {
    window.scrollTo(0, 0);
  }

  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),
    lastName: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[A-Za-z]+$/)
    ]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(13),
      Validators.max(120)
    ]),
    email: new FormControl<string>("", [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
    ]),
    address: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200)
    ]),
    phone: new FormControl<string>("+995", [
      Validators.required,
      Validators.pattern(/^\+995\d{9}$/)
    ]),
    zipcode: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern(/^[0-9]+$/)
    ]),
    avatar: new FormControl<string>("", [
      Validators.required,
      Validators.pattern(/^https?:\/\/.+/i)
    ]),
    gender: new FormControl<string>("", [
      Validators.required,
      Validators.pattern(/^(MALE|FEMALE|OTHER)$/i)
    ])
  })

  public err: any;
  public succ: boolean = false

  register() {
    this.api.signUp(this.registerForm.value).subscribe({
      next: () => {},
      error: (data:any) => {
        this.err = data.error.errorKeys
        setTimeout(() => {
          this.err = ""
        }, 4000);
      },
      complete: () => {
        this.succ = true
        setTimeout(() => {
          this.routing.navigate(["/Login"])
        }, 3000);
      }
    })
  }
}
