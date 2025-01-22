import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FleetService } from '../../api/fleet.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FleetFormComponent } from '../fleet-form/fleet-form.component';
import { ToastModule } from 'primeng/toast';
import { Button } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { AddressService } from '../../../address/api/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fleet-list',
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
  templateUrl: './fleet-list.component.html',
  styleUrl: './fleet-list.component.scss',
})
export class FleetListComponent {
  public fleets = signal<any[]>([]);
  private fleetService: FleetService = inject(FleetService);
  private addressService: AddressService = inject(AddressService);
  private router: Router = inject(Router);
  constructor() {
    effect(async () => {
      await this.refreshFleetList();
    });
  }

  public async openDialog(fleet?: any): Promise<void> {
    if (fleet) {
      await this.router.navigate(['/fleet-form', fleet._id]); // Open form with ID
    } else {

      await this.router.navigate(['/fleet-form']); // Open form without ID
    }
  }
  private async refreshFleetList(): Promise<void> {
    const fleets = await this.fleetService.getAllFleets(); // Fetch fleets asynchronously
    for (const f of fleets) {
      const address = await this.addressService.getAddressById(f.address);
      const city = address['city'] ?? '';
      const postCode = address['postCode'] ?? '';
      const street = address['street'] ?? '';
      const streetNumber = address['streetNumber'] ?? '';
      f['address'] = `${city}, ${postCode}, ${street} ${streetNumber}`.trim(); // Handle empty parts
    }
    this.fleets.set(fleets); // Set the fetched fleets into the signal
  }
}
