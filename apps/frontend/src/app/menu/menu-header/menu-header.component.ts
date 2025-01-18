import { Component, WritableSignal, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { menuHeaderItem } from '../items/menu-header.item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [CommonModule, MegaMenuModule],
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent {
  // Use WritableSignal to allow updates
  public isLoggedIn: WritableSignal<boolean> = signal(localStorage.getItem('jwtToken') !== null);

  // Reactive menu items
  public menuHeaderItem = signal(menuHeaderItem);

 private router: Router = inject(Router);
  constructor() {
    // Watch the login status and update menu items dynamically
    effect(async () => {
      const loggedIn = this.isLoggedIn();
      if (loggedIn) {
        await this.router.navigate(['/bus-list']); // Redirect after login
      }
      this.updateMenuItemsVisibility(loggedIn);
    });
  }

  updateMenuItemsVisibility(loggedIn: boolean): void {
    this.menuHeaderItem.update(items =>
      items.map(item => {
        if (item.label === 'Login') {
          item.visible = !loggedIn;
        }
        if (this.isLoggedIn()) {

          item.visible = item.label !== 'Login';
        }


        return item;
      })
    );
  }
}
