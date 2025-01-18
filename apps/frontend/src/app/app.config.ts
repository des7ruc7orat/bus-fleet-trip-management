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
import { provideTranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// const supportedLanguages = ['en', 'de'];

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

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
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
    ),
    DialogService,
    { provide: DynamicDialogConfig, useValue: {} },
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // {
    //   provide: 'APP_INITIALIZER',
    //   useFactory: (translate: TranslateService) => async () => {
    //     const defaultLang = 'en';
    //     try {
    //       await firstValueFrom(translate.use(defaultLang)); // Try loading the default language
    //     } catch (error) {
    //       console.error('Error loading translations, falling back to default language:', error);
    //     }
    //   },
    //   deps: [TranslateService],
    //   multi: true,
    // },
    provideTranslateService({
      defaultLanguage: 'en',
    }),
  ],
};
