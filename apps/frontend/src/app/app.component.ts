import { Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuHeaderComponent } from './menu/menu-header/menu-header.component';
import {
  TranslateService,
}
from "@ngx-translate/core";
import { AuthService } from './components/login/api/auth.service';
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, MenuHeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    effect(async () => {
      console.log('effect');
      if (!this.authService.isTokenValid()) {
        // implement messageService
        this.authService.logout();
        await this.router.navigate(['login']);

      }
    });  }
}
