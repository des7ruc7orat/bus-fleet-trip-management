import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FleetService } from '../../api/fleet.service';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TabViewModule } from 'primeng/tabview';
import { AddressService } from '../../../address/api/address.service';
import { BusListComponent } from '../../../bus/ui/bus-list/bus-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; // Adjust as needed

@Component({
  selector: 'app-fleet-form',
  templateUrl: './fleet-form.component.html',
  styleUrls: ['./fleet-form.component.scss'],
  imports: [
    Button,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    TranslatePipe,
    TabViewModule,
    BusListComponent,
    ToastModule,
  ],
})
export class FleetFormComponent {
  public fleet: WritableSignal<any> = signal({});
  public address: WritableSignal<any> = signal({});
  public fleetId!: string;
  private fleetService: FleetService = inject(FleetService);
  private addressService: AddressService = inject(AddressService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);
  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.fleetId = params.get('id')!; // Extract the 'id' parameter
      if (this.fleetId) {
        await this.loadFleets(this.fleetId); // Call a method to load fleet details
      } else {
        this.fleet.set({});
      }
    });
  }

  public async onDelete(): Promise<void> {
    await this.fleetService.deleteFleet(this.fleet()._id);
    await this.addressService.deleteAddress(this.address()._id);
    await this.router.navigate(['/fleet-list']);
    const detailMessage = await firstValueFrom(
      this.translateService.get('Messages.Success.Delete', {
        entity: `${this.fleet().name}`,
      })
    );
    const successMessage = await firstValueFrom(
      this.translateService.get('Messages.Success.DeleteSuccessful')
    );
    this.messageService.add({
      severity: 'success',
      summary: successMessage,
      detail: detailMessage,
    });
  }

  public async onSubmit() {
    const currentFleet = this.fleet();
    const currentAddress = this.address();
    if (
      !currentAddress?.name ||
      !currentAddress.city ||
      !currentAddress.postCode ||
      !currentAddress.street ||
      !currentAddress.streetNumber ||
      !currentFleet.name ||
      !currentFleet.capacity
    ) {
      console.error('No data provided for the bus or missing required fields');
      return;
    }

    try {
      if (this.fleetId) {
        await this.onUpdate();
      } else {
        const newAddress = await this.addressService.createAddress(
          currentAddress
        );
        currentFleet.address = newAddress._id;
        const createdFleet = await this.fleetService.createFleet(currentFleet);
        await this.router.navigate(['/fleet-form', createdFleet['_id']]);
        const detailMessage = await firstValueFrom(
          this.translateService.get('Messages.Success.Create', {
            entity: `${createdFleet.name}`,
          })
        );
        const successMessage = await firstValueFrom(
          this.translateService.get('Messages.Success.CreateSuccessful')
        );
        this.messageService.add({
          severity: 'success',
          summary: successMessage,
          detail: detailMessage,
        });
      }
    } catch (error) {
      console.error('Error creating fleet:', error);
    }
  }

  async onUpdate() {
    const updatedFleet = this.fleet();
    const updatedAddress = this.address();
    if (
      !updatedFleet?.name ||
      !updatedFleet?.capacity ||
      !updatedAddress.name ||
      !updatedAddress.city ||
      !updatedAddress.postCode ||
      !updatedAddress.street ||
      !updatedAddress.streetNumber
    ) {
      console.error(
        'No data provided for the fleet or address, or missing required fields'
      );
      return;
    }

    try {
      const updatedTrip = await this.fleetService.updateFleet(
        this.fleetId,
        updatedFleet
      );
      await this.addressService.updateAddress(
        updatedFleet.address,
        updatedAddress
      );
      const detailMessage = await firstValueFrom(
        this.translateService.get('Messages.Success.Update', {
          entity: `${updatedTrip.name}`,
        })
      );
      const successMessage = await firstValueFrom(
        this.translateService.get('Messages.Success.UpdateSuccessful')
      );
      this.messageService.add({
        severity: 'success',
        summary: successMessage,
        detail: detailMessage,
      });
    } catch (error) {
      console.error('Error updating fleet:', error);
    }
  }

  private async loadFleets(id: string) {
    try {
      const fleet = await this.fleetService.getFleetById(id);
      if (fleet['address']) {
        const address = await this.addressService.getAddressById(
          fleet['address']
        ); // Assuming this method exists
        this.address.set(address);
      }
      this.fleet.set(fleet);
    } catch (error) {
      console.error('Error loading fleet:', error);
    }
  }
}
