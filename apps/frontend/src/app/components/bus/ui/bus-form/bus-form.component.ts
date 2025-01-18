import { ChangeDetectorRef, Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { BusService } from '../../api/bus.service';
import { UserService } from '../../../user/api/user.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
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
    TranslatePipe,
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
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);
  constructor() {
    effect(async () => {
      if (this.config.data) {
        const bus = await this.busService.getBusById(this.config.data.id);
        this.bus.set(bus);
      }
    });
  }

  // Fetch drivers based on user input
  searchDriver(event: any) {
    const query = event.query;

    this.userService.getUsers(query).subscribe((users) => {
      this.filteredDrivers = users; // Update the filtered drivers list
    });
  }

  // Handle bus form submission
  onSubmit() {
    const currentBus = this.bus();

    if (!currentBus || !currentBus.name) {
      console.error('No data provided for the bus or missing required fields');
      return;
    }

    this.busService
      .createBus(currentBus)
      .then((newBus) => {
        console.log('Bus created successfully:', newBus);
      })
      .catch((error: any) => {
        console.error('Error creating bus:', error);
      });
  }
  public async onUpdate(): Promise<void> {
    try {
      const updatedBus = this.bus(); // Get the actual bus data from the signal
      if (!updatedBus || !updatedBus.name) {
        console.error(
          'No data provided for the bus or missing required fields'
        );
        return;
      }

      await this.busService.updateBus(this.config.data.id, updatedBus); // Pass the resolved data
      const myBookingTitle = await firstValueFrom(this.translateService.get('Bus.Name'));
      this.messageService.add({
        severity: 'warn',
        summary: 'message summary',
        detail: myBookingTitle,
      });
    } catch (error) {
      console.error('Error updating bus:', error);
    }
  }
}
