import { Component, WritableSignal, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { menuHeaderItem } from '../items/menu-header.item';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../components/login/api/auth.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [CommonModule, MegaMenuModule, TranslateModule, ToastModule],
  providers: [MessageService],
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent {
  // Signal to track if the user is logged in
  public isLoggedIn: WritableSignal<boolean> = inject(AuthService).isLoggedIn;
  // Menu items, using the signal
  public menuHeaderItem = signal(menuHeaderItem);

  private router: Router = inject(Router);
  private translate: TranslateService = inject(TranslateService);
  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);
  constructor() {
    // Monitor login status and update menu items or perform navigation
    effect(() => {
      const loggedIn = this.isLoggedIn();
      console.log('isLoggedIn in effect', this.isLoggedIn());
      this.updateMenuItemsVisibility(loggedIn);

      // Redirect based on login status
      if (loggedIn) {
        this.router.navigate(['/trip-list']).catch(console.error);
      } else {
        this.router.navigate(['/login']).catch(console.error);
      }
    });
  }

  // Update the visibility of menu items based on login status
  private updateMenuItemsVisibility(loggedIn: boolean): void {
    this.menuHeaderItem.update((items) =>
      items.map((item) => ({
        ...item,
        visible: item.label === 'Login' ? !loggedIn : loggedIn,
        command:
          item.label === 'Logout' ? this.logout.bind(this) : item.command, // Add the logout command dynamically
      }))
    );
  }

  // Handle logout action, remove token, and update login status
  public async logout(): Promise<void> {
    const detailMessage = await firstValueFrom(
      this.translateService.get('Messages.Success.Logout')
    );
    const message = await firstValueFrom(
      this.translateService.get('Messages.Success.LogoutSuccess')
    );
    this.messageService.add({
      severity: 'success',
      summary: message,
      detail: detailMessage,
    });
    this.authService.logout(); // Remove token
    this.updateMenuItemsVisibility(false); // Update visibility after logout
  }
}
