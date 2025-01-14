import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { menuHeaderItem } from '../items/menu-header.item';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [CommonModule, MegaMenuModule],
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent {
  protected readonly menuHeaderItem = menuHeaderItem;
}
