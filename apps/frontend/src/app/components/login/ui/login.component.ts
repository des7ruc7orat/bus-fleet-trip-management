import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { menuHeaderItem } from '../../../menu/items/menu-header.item';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    Button,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  private menuHeaderItem = signal(menuHeaderItem);
  async onSubmit() {
    try {
      const response = await this.authService.login(this.loginData);
      this.authService.storeToken(response.access_token);
      // this.updateMenuItemsVisibility();
      await this.router.navigate(['/fleet-list']); // Redirect after login
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  }

  updateMenuItemsVisibility(): void {
    this.menuHeaderItem.update((items) =>
      items.map((item) => {
        if (item.label === 'Auth.Login') {
          item.visible = false;
        }
        item.visible = item.label !== 'Auth.Login';

        return item;
      })
    );
  }
}
