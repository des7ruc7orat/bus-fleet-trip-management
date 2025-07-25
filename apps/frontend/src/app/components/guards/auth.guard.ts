import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../login/api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  canActivate(): boolean {
    if (this.authService.isTokenValid()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
