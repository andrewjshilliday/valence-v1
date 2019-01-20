import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playlistFilter',
  pure: false
})
export class PlaylistFilterPipe implements PipeTransform {

  transform(items: any, args?: string): any {
    if (!items || !args) {
      return items;
    }

    if (args.toLowerCase() === 'all') {
      return items;
    }

    if (args.toLowerCase() === 'essentials') {
      return items.filter(item => item.attributes.name.toLowerCase().includes('essentials'));
    }

    if (args.toLowerCase() === 'next steps') {
      return items.filter(item => item.attributes.name.toLowerCase().includes('next steps'));
    }

    if (args.toLowerCase() === 'deep cuts') {
      return items.filter(item => item.attributes.name.toLowerCase().includes('deep cuts'));
    }

    if (args.toLowerCase() === 'influences') {
      return items.filter(item => item.attributes.name.toLowerCase().includes('influences'));
    }

    if (args.toLowerCase() === 'inspired') {
      return items.filter(item => item.attributes.name.toLowerCase().includes('inspired'));
    }
  }

}
