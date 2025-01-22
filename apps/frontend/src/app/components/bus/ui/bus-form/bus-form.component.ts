import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { BusService } from '../../api/bus.service';
import { UserService } from '../../../user/api/user.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FleetService } from '../../../fleet/api/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-bus-form',
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
  ],
  standalone: true,
  providers: [MessageService],
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.scss'],
})
export class BusFormComponent {
  public bus: WritableSignal<any> = signal({});
  public filteredDrivers: any[] = [];
  public filteredFleets: any[] = [];
  public busId!: string;
  private busService: BusService = inject(BusService);
  private userService: UserService = inject(UserService);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);
  private fleetService: FleetService = inject(FleetService);
  private readonly dialogRef!: DynamicDialogRef;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.busId = params.get('id')!; // Extract the 'id' parameter
      if (this.busId) {
        await this.loadBus(this.busId); // Call a method to load bus details
      } else {
        this.bus.set({});
      }
    });
  }

  public async searchDriver() {
    try {
      const users = await this.userService.getUsers();
      this.filteredDrivers = users
        .filter((user) => user.role === 'driver')
        .map((user) => ({
          ...user,
          fullName: `${user.email}`, // Add fullName for display
        }));
    } catch (err) {
      console.error('Error fetching drivers:', err);
    }
  }

  async searchFleet() {
    try {
      const fleets = await this.fleetService.getAllFleets();
      this.filteredFleets = fleets
        .filter((fleet) => fleet)
        .map((fleet) => ({
          ...fleet,
          fullFleet: `${fleet.name}`, // Add fullFleet for display
        }));
    } catch (err) {
      console.error('Error fetching drivers:', err);
    }
  }

  async onSubmit() {
    const currentBus = this.bus();
    if (!currentBus?.name) {
      console.error('No data provided for the bus or missing required fields');
      return;
    }

    try {
      if (this.busId) {
        // Update logic
        await this.onUpdate();
      } else {
        // Remove _id before creation
        // delete currentBus._id;

        // Create a new bus
        const createdBus = await this.busService.createBus(currentBus);
        await this.router.navigate(['/bus-form', createdBus['_id']]);
        const detailMessage = await firstValueFrom(
          this.translateService.get('Messages.Success.Create', {entity: `${createdBus.name}`}),
        );
        const successMessage = await firstValueFrom(
          this.translateService.get('Messages.Success.CreateSuccessful'),
        );
        this.messageService.add({
          severity: 'success',
          summary: successMessage,
          detail: detailMessage,
        });
      }
    } catch (error) {
      console.error('Error creating or updating bus:', error);
    }
  }

  public async onDelete(): Promise<void> {
    const busToDelete = this.bus();
    const fleets = await this.fleetService.getAllFleets();
    if (busToDelete.fleet) {
      const fleet = fleets.find((f) => f.name === busToDelete.fleet);
      fleet.buses = fleet.buses.filter(
        (buse: string) => buse !== busToDelete._id
      );
      await this.fleetService.updateFleet(fleet._id, fleet);
    }
    await this.busService.deleteBus(busToDelete._id);
    const detailMessage = await firstValueFrom(
      this.translateService.get('Messages.Success.Delete', {entity: `${busToDelete.name}`}),
    );
    const successMessage = await firstValueFrom(
      this.translateService.get('Messages.Success.DeleteSuccessful'),
    );
    this.messageService.add({
      severity: 'success',
      summary: successMessage,
      detail: detailMessage,
    });
    await this.router.navigate(['/bus-list']);
  }

  async onUpdate() {
    const updatedBus = this.bus();

    if (!updatedBus?.name) {
      console.error('No data provided for the bus or missing required fields');
      return;
    }

    try {
      // Fetch all drivers
      const drivers = await this.userService.getUsers();
      const fetchedDrivers = drivers.filter((user) => user.role === 'driver');
      if (!fetchedDrivers?.length) {
        console.error('No drivers fetched from API');
        return;
      }

      // Find the matching driver by email
      const driverEmail =
        typeof updatedBus.driver === 'string'
          ? updatedBus.driver
          : updatedBus.driver?.email;
      const driver = fetchedDrivers.find((d) => d.email === driverEmail);

      // Fetch all fleets
      const fleets = await this.fleetService.getAllFleets();
      if (!fleets?.length) {
        console.error('No fleets fetched from API');
        return;
      }

      // Find the matching fleet by name
      const fleetName =
        typeof updatedBus.fleet === 'string'
          ? updatedBus.fleet
          : updatedBus.fleet?.name;
      const fleet = fleets.find((f) => f.name === fleetName);

      // Update the bus with IDs
      updatedBus.driver = driver?._id;
      updatedBus.fleet = fleet?._id;
      // Perform the update
      await this.busService.updateBus(this.busId, updatedBus);

      // Reset to display values after update
      updatedBus.driver = driver?.email || null;
      updatedBus.fleet = fleet?.name || null;

      // Show success message
      const detailMessage = await firstValueFrom(
        this.translateService.get('Messages.Success.Update', {entity: `${updatedBus.name}`}),
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
      console.error('Error updating bus:', error);
    }
  }

  private async loadBus(id: string) {
    try {
      const bus = await this.busService.getBusById(id);
      if (bus['driver']) {
        const driver = await this.userService.getUserById(bus['driver']); // Assuming this method exists
        bus['driver'] = `${driver.email}`;
      }
      if (bus['fleet']) {
        const fleet = await this.fleetService.getFleetById(bus['fleet']);
        bus['fleet'] = fleet.name;
      }
      this.bus.set(bus);
    } catch (error) {
      console.error('Error loading bus:', error);
    }
  }
}
