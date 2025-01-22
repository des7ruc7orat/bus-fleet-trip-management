import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { BusService } from '../../../bus/api/bus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../api/trip.service';
import { AddressService } from '../../../address/api/address.service';
import { TabViewModule } from 'primeng/tabview';
import { UserService } from '../../../user/api/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-trip-form',
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    Button,
    FormsModule,
    AutoCompleteModule,
    TranslateModule,
    MessageModule,
    ToastModule,
    TabViewModule,
  ],
  standalone: true,
  providers: [MessageService],
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent {
  public trip: WritableSignal<any> = signal({});
  public filteredBuses: any[] = [];
  public filteredAddresses: any[] = [];
  public tripId!: string;
  public beginningPoint: WritableSignal<any> = signal({});
  public endingPoint: WritableSignal<any> = signal({});
  private tripService: TripService = inject(TripService);
  private addressService: AddressService = inject(AddressService);
  private busService: BusService = inject(BusService);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);
  private readonly dialogRef!: DynamicDialogRef;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.tripId = params.get('id')!; // Extract the 'id' parameter
      if (this.tripId) {
        await this.loadTrip(this.tripId); // Call a method to load trip details
      } else {
        this.trip.set({});
      }
    });
  }

  async searchBus() {
    try {
      const buses = await this.busService.getAllBuses();
      this.filteredBuses = buses.map((bus) => ({
        ...bus,
        fullName: `${bus.name}`, // Add fullName for display
      }));
    } catch (err) {
      console.error('Error fetching buses:', err);
    }
  }
  public async searchAddress() {
    try {
      const addresses = await this.addressService.getAllAddresses();
      this.filteredAddresses = addresses.map((address) => ({
        ...address,
        fullAddress: `${address.street}, ${address.city}`, // Add fullAddress for display
      }));
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  }

  async onSubmit() {
    const currentTrip = this.trip();
    const beginningPoint = this.beginningPoint();
    const endingPoint = this.endingPoint();
    if (!currentTrip?.startingTime) {
      console.error('No data provided for the trip or missing required fields');
      return;
    }

    try {
      if (this.tripId) {
        // Update logic
        await this.onUpdate();
      } else {
        // Create a new trip
        const newBeginningPoint = await this.addressService.createAddress(
          beginningPoint,
        );
        const newEndingPoint = await this.addressService.createAddress(
          endingPoint,
        );
        currentTrip.beginningPoint = newBeginningPoint._id;
        currentTrip.endingPoint = newEndingPoint._id;
        const createdTrip = await this.tripService.create(currentTrip);
        await this.router.navigate(['/trip-form', createdTrip['_id']]);
        const detailMessage = await firstValueFrom(
          this.translateService.get('Messages.Success.Create', {entity: `${createdTrip.name}`}),
        );
        const successMessage = await firstValueFrom(
          this.translateService.get('Messages.Success.CreateSuccessful'),
        );
        this.messageService.add({
          severity: 'success',
          summary: successMessage,
          detail: detailMessage,
        });
        // Navigate to form with the created ID to enable updates
      }
    } catch (error) {
      console.error('Error creating or updating trip:', error);
    }
  }

  public async onDelete(): Promise<void> {
    await this.tripService.delete(this.tripId);
    await this.addressService.deleteAddress(this.beginningPoint()._id);
    await this.addressService.deleteAddress(this.endingPoint()._id);
    const detailMessage = await firstValueFrom(
      this.translateService.get('Messages.Success.Delete', {entity: `${this.trip().name}`}),
    );
    const successMessage = await firstValueFrom(
      this.translateService.get('Messages.Success.DeleteSuccessful'),
    );
    this.messageService.add({
      severity: 'success',
      summary: successMessage,
      detail: detailMessage,
    });
    await this.router.navigate(['/trip-list']);
  }

  async onUpdate() {
    const updatedTrip = this.trip();

    if (!updatedTrip?.startingTime) {
      console.error('No data provided for the trip or missing required fields');
      return;
    }

    try {

      const buses = await this.busService.getAllBuses();
      const busName =
        typeof updatedTrip.bus === 'string'
          ? updatedTrip.bus
          : updatedTrip.bus?.name;
      const bus = buses.find((b) => b.name === busName);
      updatedTrip.bus = bus?.['_id'];
      await this.tripService.update(this.tripId, updatedTrip);
      updatedTrip.bus = bus?.name || null;
      // Show success message
      const detailMessage = await firstValueFrom(
        this.translateService.get('Messages.Success.Update', {entity: `${updatedTrip.name}`}),
      );
      const successMessage = await firstValueFrom(
        this.translateService.get('Messages.Success.UpdateSuccessful'),
      );
      this.messageService.add({
        severity: 'success',
        summary: successMessage,
        detail: detailMessage,
      });
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  }

  private async loadTrip(id: string) {
    try {
      const trip = await this.tripService.getById(id);
      trip.startingTime = new Date(trip.startingTime).toISOString().slice(0, 16); // For <input type="datetime-local">
      trip.arrivingTime = new Date(trip.arrivingTime).toISOString().slice(0, 16);
      const beginningPoint = await this.addressService.getAddressById(
        trip['beginningPoint'],
      ); // Assuming this method exists
      this.beginningPoint.set(beginningPoint);
      const endingPoint = await this.addressService.getAddressById(
        trip['endingPoint'],
      ); // Assuming this method exists
      this.endingPoint.set(endingPoint);
      const bus = await this.busService.getBusById(trip['bus']); // Assuming this method exists
      trip['bus'] = `${bus.name}`;

      this.trip.set(trip);
    } catch (error) {
      console.error('Error loading trip:', error);
    }
  }
}
