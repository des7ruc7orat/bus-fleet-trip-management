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
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../user/api/user.service';
import { Button } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TripService } from '../../api/trip.service';
import * as moment from 'moment';
import { BusService } from '../../../bus/api/bus.service';
import { AddressService } from '../../../address/api/address.service';
@Component({
  selector: 'app-trip-list',
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
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss',
})
export class TripListComponent {
  public trips = signal<any[]>([]); // Changed to trips instead of buses
  @Input() public fleetId!: string;

  public userService: UserService = inject(UserService);
  private tripService: TripService = inject(TripService); // Assuming TripService is implemented similarly
  private busService: BusService = inject(BusService);
  private router: Router = inject(Router);
  private addressService: AddressService = inject(AddressService);

  constructor() {
    effect(async () => {
      await this.refreshTripList();
    });
  }

  public async openDialog(trip?: any): Promise<void> {
    if (trip) {
      await this.router.navigate(['/trip-form', trip._id]); // Open form with ID
    } else {
      await this.router.navigate(['/trip-form']); // Open form without ID
    }
  }

  private async refreshTripList(): Promise<void> {
    let trips: any[] = [];
    trips = await this.tripService.getAll(); // Fetch trips asynchronously
    for (const t of trips) {
      if (t['bus']) {
        const bus = await this.busService.getBusById(t['bus']);
        t['bus'] = bus.name;
      } else {
        t['bus'] = '';
      }
      if (t['startingTime']) {
        t['startingTime'] =  moment(t['startingTime'])
          .local()
          .format('Do MMMM YYYY, h:mm A')
      }
      if (t['arrivingTime']) {
        t['arrivingTime'] = moment(t['arrivingTime'])
          .local()
          .format('Do MMMM YYYY, h:mm A')
      }
      t['beginningPoint'] = await this.formatAddress( t['beginningPoint']);
      t['endingPoint'] = await this.formatAddress( t['endingPoint']);
    }
    this.trips.set(trips); // Set the fetched trips into the signal
  }

  private async formatAddress(a: any): Promise<string> {
    const address = await this.addressService.getAddressById(a);
    const city = address['city'] ?? '';
    const postCode = address['postCode'] ?? '';
    const street = address['street'] ?? '';
    const streetNumber = address['streetNumber'] ?? '';
   return `${city}, ${postCode}, ${street} ${streetNumber}`.trim(); // Handle empty parts
  }
}
