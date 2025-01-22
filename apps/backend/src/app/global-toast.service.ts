import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalToastService {
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);

  async showSuccessToast() {
    try {
      const detailMessage = await firstValueFrom(
        this.translateService.get('Messages.Success.Logout')
      );
      const message = await firstValueFrom(
        this.translateService.get('Messages.Success.LogoutSuccess')
      );
      this.messageService.add({
        severity: 'success',
        summary: message,
        detail: detailMessage,
      });
    } catch (error) {
      console.error('Error fetching translations for toast', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unable to fetch translation for success message.',
      });
    }
  }
}
