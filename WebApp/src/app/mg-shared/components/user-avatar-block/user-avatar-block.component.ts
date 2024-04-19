import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'mg-user-avatar-block',
  templateUrl: './user-avatar-block.component.html',
  styleUrls: ['./user-avatar-block.component.scss']
})
export class UserAvatarBlockComponent implements OnInit {

  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

  constructor(
      private readonly authService: AuthenticationService,
      private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }

}
