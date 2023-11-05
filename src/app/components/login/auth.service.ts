import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'ticket')
      .set('username', username)
      .set('password', password);

    return this.http.post('http://localhost:9090/realms/spring-ticket-realm/protocol/openId-connect/token', body.toString(), { headers });
  }

  logout() {
    return this.http.post('/api/logout', {});
  }
}
