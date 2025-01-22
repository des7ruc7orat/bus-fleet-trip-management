import { Component, effect, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Bus, BusService } from '../../api/bus.service';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../user/api/user.service';
import { Button } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { FleetService } from '../../../fleet/api/fleet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-list',
  imports: [
    CommonModule,
    TagModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    Button,
    TranslatePipe,
  ],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.scss',
})
export class BusListComponent {
  public buses = signal<any[]>([]);
  @Input() public fleetId!: string;
  public userService: UserService = inject(UserService);
  private busService: BusService = inject(BusService);
  private fleetService: FleetService = inject(FleetService);
  private router: Router = inject(Router);
  constructor() {
    effect(async () => {
      await this.refreshBusList();
    });
  }

  public async openDialog(bus?: any): Promise<void> {
    if (bus) {
    await this.router.navigate(['/bus-form', bus._id]); // Open form with ID
    } else {

    await this.router.navigate(['/bus-form']); // Open form without ID
    }

  }

  private async refreshBusList(): Promise<void> {
    let buses: Bus[] = [];
    buses = await this.busService.getAllBuses(); // Fetch buses asynchronously
    buses = this.fleetId
      ? buses.filter((b) => b['fleet'] === this.fleetId)
      : buses;
    for (const b of buses) {
      // Check if bus has a driver ID and fetch the driver info, otherwise set it to empty
      if (b['driver']) {
        const driver = await this.userService.getUserById(b['driver']);
        b['driver'] = driver.email;
      } else {
        b['driver'] = ''; // Set driver to empty if there's no driver ID
      }
      if (b['fleet']) {
        const fleet = await this.fleetService.getFleetById(b['fleet']);
        b['fleet'] = fleet.name;
      } else {
        b['fleet'] = ''; // Set fleet to empty if there's no fleet ID
      }
    }
    this.buses.set(buses); // Set the fetched buses into the signal
  }
}
