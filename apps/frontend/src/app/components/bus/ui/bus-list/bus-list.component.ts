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
  ],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.scss',
})
export class BusListComponent {
  public buses = signal<any[]>([]);
  public ref: DynamicDialogRef | undefined;
  private busService: BusService = inject(BusService);
  private dialogService: DialogService = inject(DialogService);

  constructor() {
    effect(async () => {
      const buses = await this.busService.getAllBuses(); // Fetch buses asynchronously
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
    });
  }
}
