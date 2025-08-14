import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  constructor(private api: ApiService, private routing: Router) {

  }

  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    age: new FormControl<number>(0, [Validators.required]),
    email: new FormControl<string>("", [Validators.email, Validators.required]),
    password: new FormControl<string>("", [Validators.required, Validators.minLength(5)]),
    address: new FormControl<string>("", [Validators.required]),
    phone: new FormControl<string>("+995", [Validators.required ]),
    zipcode: new FormControl<string>("", [Validators.required]),
    avatar: new FormControl<string>("", [Validators.required]),
    gender: new FormControl<string>("", [Validators.required])
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
