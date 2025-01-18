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
import { BusService } from '../../api/bus.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BusFormComponent } from '../bus-form/bus-form.component';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../user/api/user.service';
import { Button } from 'primeng/button';

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
  ],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.scss',
})
export class BusListComponent {
  public buses = signal<any[]>([]);
  public ref: DynamicDialogRef | undefined;
  public userService: UserService = inject(UserService);
  private busService: BusService = inject(BusService);
  private dialogService: DialogService = inject(DialogService);

  constructor() {
    effect(async () => {
      const buses = await this.busService.getAllBuses(); // Fetch buses asynchronously
      for (const b of buses) {
        // Check if bus has a driver ID and fetch the driver info, otherwise set it to empty
        if (b['driver']) {
          const driver = await this.userService.getUserById(b['driver']);
          b['driver'] = driver.email;
        } else {
          b['driver'] = ''; // Set driver to empty if there's no driver ID
        }
      }
      console.log(buses);
      this.buses.set(buses); // Set the fetched buses into the signal
    });
  }

  public openDialog(bus: any): void {
    this.ref = this.dialogService.open(BusFormComponent, {
      data: {
        id: bus._id,
      },
      header: 'Bus Details',
      width: '100%',
      height: '100%',
    });
  }

  public openNewDialog(): void {
    this.ref = this.dialogService.open(BusFormComponent, {
      header: 'Bus Details',
      width: '100%',
      height: '100%',
    });
  }
}
