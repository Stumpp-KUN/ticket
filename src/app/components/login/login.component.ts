import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  username: string = '';
  password: string = '';

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        const accessToken = response.access_token;
      },
      (error) => {
        console.error('Ошибка аутентификации', error);
      }
    );
  }
}
