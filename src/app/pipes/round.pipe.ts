import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    if (args === 'floor') {
      return Math.floor(value);
    }

    if (args === 'ceiling') {
      return Math.ceil(value);
    }

    return value;
  }

}
