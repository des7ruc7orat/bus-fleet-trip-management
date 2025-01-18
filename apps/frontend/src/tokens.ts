import { InjectionToken, makeStateKey } from '@angular/core';

// Key for TransferState storage
export const TRANSLATIONS_KEY = makeStateKey<Record<string, any>>('translations');

// Token to provide translation file locations
export const TRANSLATION_LOCATIONS = new InjectionToken<string[]>(
  'Translation file locations'
);
