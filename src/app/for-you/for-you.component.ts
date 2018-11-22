import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {

  loading: boolean;
  recentPlayedRelationships: any;
  heavyRotationRelationships: any;
  todaysAlbumsRelationships: any;
  newReleasesRelationships: any;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
    this.loadRecommenations();
  }

  async loadRecommenations() {
    this.loading = true;
    await this.getRecommenations();
    this.loading = false;

    this.recentPlayedRelationships = await this.getItemRelationships(
      this.musicService.recentPlayed, 'albums'
    );
    this.heavyRotationRelationships = await this.getItemRelationships(
      this.musicService.heavyRotation, 'albums'
    );
    this.todaysAlbumsRelationships = await this.getItemRelationships(
      this.musicService.recommendations[2].relationships.recommendations.data, 'todaysAlbums'
    );
    this.newReleasesRelationships = await this.getItemRelationships(
      this.musicService.recommendations[4].relationships.contents.data, 'albums'
    );
  }

  async getRecommenations(): Promise<any> {
    if (!this.musicService.recommendations || (Date.now() - this.musicService.recommendationsDate) > 60 * 60 * 1000) {
      this.musicService.recommendations = await this.musicService.musicKit.api.recommendations();
      this.musicService.recommendationsDate = Date.now();
    }

    this.musicService.recentPlayed = await this.musicService.musicKit.api.recentPlayed();

    if (this.musicService.recentPlayed.length === 10) {
      const next = await fetch('https://api.music.apple.com/v1/me/recent/played?offset=10',
        {headers: Utils.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data) {
          this.musicService.recentPlayed.push(item);
        }
      }
    }

    this.musicService.heavyRotation = await this.musicService.musicKit.api.historyHeavyRotation();

    if (this.musicService.heavyRotation.length === 10) {
      const next = await fetch('https://api.music.apple.com/v1/me/me/history/heavy-rotation?offset=10',
        { headers: Utils.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data) {
          this.musicService.recentPlayed.push(item);
        }
      }
    }

    if (this.musicService.recommendations[4].next) {
      const next = await fetch('https://api.music.apple.com' + this.musicService.recommendations[4].next,
        { headers: Utils.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data[0].relationships.contents.data) {
          this.musicService.recommendations[4].relationships.contents.data.push(item);
        }
      }
    }
  }

  async getItemRelationships(collection: any, type: string) {
    let itemIdArray: any;
    let results: any;
    const trackRelationships = [];
    let itemFound: boolean;

    switch (type) {
      case 'albums': {
        const albums = collection.filter(i => i.type === 'albums');
        itemIdArray = albums.map(i => i.id);
        results = await this.musicService.musicKit.api.albums(itemIdArray, { include: 'artists' });

        for (const item of collection) {
          itemFound = false;

          for (const result of results) {
            if (item.id === result.id) {
              trackRelationships.push([item.id, result.relationships.artists.data[0].id]);
              itemFound = true;
              break;
            }
          }

          if (itemFound) {
            continue;
          } else {
            trackRelationships.push([item.id, null]);
          }
        }

        break;
      }
      case 'todaysAlbums': {
        itemIdArray = [];

        for (const recommendation of collection) {
          for (const item of recommendation.relationships.contents.data) {
            itemIdArray.push(item.id);
          }
          /* itemIdArray.concat(recommendation.relationships.contents.data.map(i => i.id)); */
        }

        results = await this.musicService.musicKit.api.albums(itemIdArray, { include: 'artists' });

        for (const item of results) {
          trackRelationships.push([item.id, item.relationships.artists.data[0].id]);
        }

        break;
      }
    }

    return trackRelationships;
  }

}
