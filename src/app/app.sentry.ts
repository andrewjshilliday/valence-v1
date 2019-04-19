import { Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from '../environments/environment';
import { Secrets } from './secrets';

Sentry.init({
  dsn: Secrets.sentryDsn
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    if (environment.production) {
      Sentry.captureException(error.originalError || error);
    } else {
      console.log(error.originalError || error);
    }
  }
}
