import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['expire'])
        this.alertService.alertError("Session expired, please signin again");
    });
  }

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
      this.alertService.alertError("Invalid email or password. Try again...");
    } else {
      this.alertService.alertError("Unespected error");
    }
  }
}
