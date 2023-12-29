import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { GameDetails } from './pages/gamedetails/game-details.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: "Login"
  },
  {
    path: '',
    component: HomeComponent,
    title: "Homes"
  },
  {
    path: 'details/:id',
    component: GameDetails,
    canActivate: [authGuard]
  }
];
