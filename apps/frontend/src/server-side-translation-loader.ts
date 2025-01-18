import { inject, Injectable, TransferState, Inject } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as fs from 'fs'; // Ensure this works only on the server
import * as _ from 'lodash';
import { TRANSLATION_LOCATIONS, TRANSLATIONS_KEY } from './tokens'; // Use lodash for deep merging

@Injectable({
  providedIn: 'root',
})
export class ServerSideTranslateLoader implements TranslateLoader {
  private locations = inject(TRANSLATION_LOCATIONS);
  private state = inject(TransferState);

  constructor(@Inject('clientPath') private readonly clientPath: string) {}

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const translations = this.locations.map((location) => {
        try {
          const filePath = `${this.clientPath}/${location}/${lang}.json`;
          return fs.readFileSync(filePath, 'utf-8');
        } catch (e) {
          return '{}'; // Fallback if a file is not found
        }
      });

      const parsedTranslations = translations.map((t) => JSON.parse(t));
      const finalTranslation = parsedTranslations.reduce((acc, curr) => _.merge(acc, curr), {});

      observer.next(finalTranslation);

      // Store in TransferState for client-side reuse
      const existingI18n = this.state.get(TRANSLATIONS_KEY, {});
      existingI18n[lang] = finalTranslation;
      this.state.set(TRANSLATIONS_KEY, existingI18n);

      observer.complete();
    });
  }
}
