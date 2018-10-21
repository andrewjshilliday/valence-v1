import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'albumFilter'
})
export class AlbumFilterPipe implements PipeTransform {

  transform(items: any, args?: string): any {
    if (!items || !args) {
      return items;
    }

    if (args === 'albums') {
      return items.filter(item => item.attributes.isSingle === false);
    }

    if (args === 'singles') {
      return items.filter(item => item.attributes.isSingle === true);
    }
  }

}
