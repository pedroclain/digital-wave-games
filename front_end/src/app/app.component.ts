import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  authService = inject(AuthService);
  alertService = inject(AlertService)

  profileMenuOpen: null | string = null;

  switchProfileMenu() {
    this.profileMenuOpen === 'open' ? this.profileMenuOpen = 'close' : this.profileMenuOpen = 'open';
  }

  logout() {
    this.authService.logout();
    this.switchProfileMenu();
  }
}
