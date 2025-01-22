import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { menuHeaderItem } from '../../../menu/items/menu-header.item';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    Button,
    TranslatePipe,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);
  private menuHeaderItem = signal(menuHeaderItem);
  async onSubmit() {
    try {
      const response = await this.authService.login(this.loginData);
      this.authService.storeToken(response.access_token);
      const detailMessage = await firstValueFrom(
        this.translateService.get('Messages.Success.Login', {
          email: this.loginData.email,
        })
      );
      const message = await firstValueFrom(
        this.translateService.get('Messages.Success.LoginSuccess')
      );
      this.messageService.add({
        severity: 'success',
        summary: message,
        detail: detailMessage,
      });
      await this.router.navigate(['/bus-list']); // Redirect after login
    } catch (error) {
      console.error('Login failed', error);
      const detailMessage = await firstValueFrom(
        this.translateService.get('Messages.Error.Login')
      );
      const message = await firstValueFrom(
        this.translateService.get('Messages.Error.LoginError')
      );
      this.messageService.add({
        severity: 'success',
        summary: message,
        detail: detailMessage,
      });
    }
  }
}
