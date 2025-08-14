import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectsService } from '../../Services/subjects.service';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{
  constructor(public subjects: SubjectsService) {
    this.subjects.renewCartId();
    this.subjects.cartAvail.subscribe({
      next: (data: boolean) => {
        if(data) {
          this.subjects.renewCart();
        }
      }
    })
  }
}
