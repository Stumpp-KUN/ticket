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
          localStorage.setItem("accessToken", response.access_token);
          const decodedToken = JSON.parse(atob(response.access_token.split('.')[1]));
          const userEmail = decodedToken.email;
          const userRoles = decodedToken.realm_access.roles;

          const userRole = userRoles.find((role: string) => ["EMPLOYEE", "MANAGER", "ENGINEER"].includes(role));

          if (userRole) {
            localStorage.setItem("userEmail", userEmail);
            localStorage.setItem("role", userRole);
            this.router.navigateByUrl("/dashboard");
          } else {
            console.error('Invalid user role.');
          }
        } else {
          console.error('Access Token not found in the response.');
        }
      });
  }


}
