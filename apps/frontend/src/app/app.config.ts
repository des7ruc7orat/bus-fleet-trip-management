import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './middlewares/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
} from 'primeng/dynamicdialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../translation-loader';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(
      DynamicDialogModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    DialogService,
    { provide: DynamicDialogConfig, useValue: {} },
  ],
};
