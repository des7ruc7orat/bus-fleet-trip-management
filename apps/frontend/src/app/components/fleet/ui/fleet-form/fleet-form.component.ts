import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FleetService } from '../../api/fleet.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';
import { TabViewModule } from 'primeng/tabview';
import { AddressService } from '../../../address/api/address.service'; // Adjust as needed

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
  ],
})
export class FleetFormComponent {
  public fleet: WritableSignal<any> = signal({});
  public address: WritableSignal<any> = signal({});
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private fleetService: FleetService = inject(FleetService);
  private addressService: AddressService = inject(AddressService);

  //private addressService: AddressService = inject(AddressService);

  async onSubmit() {
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
      const  newAddress = await this.addressService.createAddress(currentAddress);
      currentFleet.address = newAddress._id;
      const newFleet = await this.fleetService.createFleet(currentFleet);
    } catch (error) {
      console.error('Error creating fleet:', error);
    }
  }

  async onUpdate() {
    const updatedFleet = this.fleet();
    if (
      !updatedFleet?.name ||
      !updatedFleet?.capacity ||
      !updatedFleet?.address?.name ||
      !updatedFleet?.address?.city ||
      !updatedFleet?.address?.postCode ||
      !updatedFleet?.address?.street ||
      !updatedFleet?.address?.streetNumber
    ) {
      console.error(
        'No data provided for the fleet or address, or missing required fields'
      );
      return;
    }

    try {
      // const updatedFleetData = await this.fleetService.updateFleet(updatedFleet);
      // console.log('Fleet updated successfully:', updatedFleetData);
    } catch (error) {
      console.error('Error updating fleet:', error);
    }
  }
}
