import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AuthService, LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    this.authService
      .login({
        email: this.formLogin.value.email!,
        password: this.formLogin.value.password!,
      })
      .subscribe({
        next: (response) => this.loginSuccessHandler(response),
        error: (err: HttpErrorResponse) => this.loginErrorHandler(err),
      });
  }

  loginSuccessHandler(response: LoginResponse) {
    this.authService.setAccessToken(response.accessToken);
    this.router.navigate(['/']);
  }

  loginErrorHandler(err: HttpErrorResponse) {
    if (err.status === HttpStatusCode.Unauthorized) {
      alert('Invalid email or password. Try again...');
    } else {
      alert('Unespected error');
    }
  }
}
