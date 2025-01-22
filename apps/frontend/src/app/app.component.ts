import { Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuHeaderComponent } from './menu/menu-header/menu-header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from './components/login/api/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MenuHeaderComponent,
    TranslateModule,
    ToastModule,
    MessageModule,
  ],
  providers: [MessageService],
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
      if (!this.authService.isTokenValid()) {
        // implement messageService
        this.authService.logout();
        await this.router.navigate(['login']);
      }
    });
  }
}
