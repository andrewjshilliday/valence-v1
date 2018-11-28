import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'src/app/music.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-media-item-collection-list',
  templateUrl: './media-item-collection-list.component.html',
  styleUrls: ['./media-item-collection-list.component.css']
})
export class MediaItemCollectionListComponent implements OnInit {

  @Input() collection: any;
  @Input() showHeader: boolean;
  @Input() showArtistAlbum: boolean;
  @Input() showArtwork: boolean;
  @Input() itemRelationships: any;

  collectionRatings: any;
  todaysDate: Date;
  collectionDuration = 0;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
    this.todaysDate = new Date();

    for (const item of this.collection.relationships.tracks.data) {
      this.collectionDuration += item.attributes.durationInMillis;
    }

    this.getRatings();
  }

  async getRatings() {
    let url = 'https://api.music.apple.com/v1/me/ratings/songs?ids=';

    for (const item of this.collection.relationships.tracks.data) {
      url += item.id;

      if (this.collection.relationships.tracks.data[this.collection.relationships.tracks.data.length - 1].id !== item.id) {
        url += ',';
      }
    }

    this.collectionRatings = await fetch(url, { headers: Utils.appleApiHeaders() }).then(res => res.json());
  }

  getItemRating(item: any): number {
    if (!item || !this.collectionRatings) {
      return 0;
    }

    for (const rating of this.collectionRatings.data) {
      if (item.id === rating.id && rating.attributes.value === 1) {
        return rating.attributes.value;
      }
    }

    return 0;
  }

  addRating(item: any, oldRating: number, newRating: number) {
    this.musicService.addRating(item, newRating);

    const currentRatings = this.collectionRatings.data.map(r => r.id);

    if (currentRatings.indexOf(item.id) === -1) {
      const rating = {
        id: item.id,
        type: 'ratings',
        href: `/v1/me/ratings/songs/${item.id}`,
        attributes: {
          value: newRating
        }
      };

      this.collectionRatings.data.push(rating);
    } else {
      this.collectionRatings.data[currentRatings.indexOf(item.id)].attributes.value = newRating;
    }
  }

}
