import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router:Router) {
    localStorage.clear();
  }

  username: string = '';
  password: string = '';

  login() {
    this.authService.login(this.username, this.password)
      .subscribe((response: any) => {
        if (response.access_token) {
          localStorage.setItem("accessToken",response.access_token);
          this.router.navigateByUrl("/dashboard")
        } else {
          console.error('Access Token not found in the response.');
        }
      });
  }
}
