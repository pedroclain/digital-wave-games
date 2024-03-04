import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtService, PayloadType } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private payload: null | PayloadType = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtService: JwtService,
  ) {}

  login({ email, password }: LoginType) {
    return this.http.post<LoginResponse>('auth', {
      email,
      password,
    });
  }

  setAccessToken(accessToken: string) {
    this.cookieService.set('accessToken', accessToken);
    this.payload = this.jwtService.decode(accessToken);
  }

  getAccessToken() {
    return this.cookieService.get('accessToken');
  }

  isLoggedIn() {
    return this.cookieService.check('accessToken');
  }

  logout() {
    this.cookieService.delete('accessToken');
  }

  getPayload() {
    if (!this.payload)
      this.payload = this.jwtService.decode(this.getAccessToken());

    return this.payload;
  }
}

type LoginType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};
