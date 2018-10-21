import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutes'
})
export class HoursMinutesPipe implements PipeTransform {

  transform(value: number): string {
    const hours: number = Math.floor(value / 60);

    if (hours === 0) {
      return Math.floor(value - hours * 60) + ' Minutes';
    }

    return hours + (hours > 1 ? ' Hours ' : ' Hour ') + Math.floor(value - hours * 60) + ' Minutes';
  }

}
