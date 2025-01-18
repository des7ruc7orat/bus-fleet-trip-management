import {
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { BusService } from '../../api/bus.service';
import { UserService } from '../../../user/api/user.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
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
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public filteredDrivers: any[] = [];
  private busService: BusService = inject(BusService);
  private userService: UserService = inject(UserService);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);

  constructor() {
    effect(() => {
      if (this.config?.data?.id) {
        this.loadBus(this.config.data.id);
      }
    });
  }

  private async loadBus(id: string) {
    try {
      const bus = await this.busService.getBusById(id);
      if (bus['driver']) {
        const driver = await this.userService.getUserById(bus['driver']); // Assuming this method exists
        bus['driver'] = `${driver.email}`;
      }
      this.bus.set(bus);
    } catch (error) {
      console.error('Error loading bus:', error);
    }
  }

  async searchDriver(event: any) {
    const query = event.query;

    try {
      const users = await this.userService.getUsers();
      this.filteredDrivers = users
        .filter(user => user.role === 'driver')
        .map(user => ({
          ...user,
          fullName: `${user.email}`, // Add fullName for display
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
      const newBus = await this.busService.createBus(currentBus);
      console.log('Bus created successfully:', newBus);
    } catch (error) {
      console.error('Error creating bus:', error);
    }
  }

  async onUpdate() {
    const updatedBus = this.bus();
    if (!updatedBus?.name) {
      console.error('No data provided for the bus or missing required fields');
      return;
    }

    try {
      const drivers =  await this.userService.getUsers();
      const driver = drivers.find(driver => driver.email === updatedBus.driver);
      updatedBus.driver = driver._id;
      await this.busService.updateBus(this.config.data.id, updatedBus);
      updatedBus.driver = driver.email;
      const message = await firstValueFrom(this.translateService.get('Bus.Name'));
      this.messageService.add({
        severity: 'warn',
        summary: 'Update Successful',
        detail: message,
      });
    } catch (error) {
      console.error('Error updating bus:', error);
    }
  }
}
