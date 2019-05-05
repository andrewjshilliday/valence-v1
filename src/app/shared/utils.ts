import { DatePipe } from '@angular/common';

export class Utils {

  static formatDate(date: string): string {
    if (date.length === 4) {
      return date;
    }

    return new DatePipe('en-US').transform(date, 'longDate');
  }

  static formatTime(ms: number): number {
    if (!ms || isNaN(ms) || !isFinite(ms)) {
      return 0;
    }

    return ms;
  }

}
