import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubjectsService } from '../../Services/subjects.service';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  public authInfo: any;
  constructor(private actR: ActivatedRoute, private cookies: CookieService, private routing: Router, private subjects: SubjectsService) {

  }
  ngOnInit(): void {
    this.authInfo = this.actR.snapshot.data["authInfo"];
  }

  logOut(): void {
    this.cookies.set("User", "")
    this.subjects.notifyLogin()
    alert("Succesfully Logged Out!")
    setTimeout(() => {
      this.routing.navigate([""])
    }, 1000);
  }
}
