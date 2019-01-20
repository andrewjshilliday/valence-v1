import { Component, OnInit, Input } from '@angular/core';
import { MusicPlayerService } from '../../services/music-player.service';
import { MusicApiService } from '../../services/music-api.service';

@Component({
  selector: 'app-media-item-collection-list',
  templateUrl: './media-item-collection-list.component.html',
  styleUrls: ['./media-item-collection-list.component.css']
})
export class MediaItemCollectionListComponent implements OnInit {

  @Input() collection: any;
  @Input() ratings: any;
  @Input() popularity: any;
  @Input() showHeader: boolean;
  @Input() showArtist: boolean;
  @Input() showAlbum: boolean;
  @Input() showArtwork: boolean;

  collectionRatings: any;
  collectionDuration = 0;

  constructor(public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) { }

  ngOnInit() {
    for (const item of this.collection.relationships.tracks.data) {
      this.collectionDuration += item.attributes.durationInMillis;
    }
  }

  getRating(item: any): number {
    if (!item || !this.ratings || !this.ratings.data) {
      return 0;
    }

    for (const rating of this.ratings.data) {
      if (item.id === rating.id && rating.attributes.value === 1) {
        return rating.attributes.value;
      }
    }

    return 0;
  }

  addRating(item: any, oldRating: number, newRating: number) {
    this.musicApiService.addRating(item, newRating);

    const currentRatings = this.ratings.data.map(r => r.id);

    if (currentRatings.indexOf(item.id) === -1) {
      const rating = {
        id: item.id,
        type: 'ratings',
        href: `/v1/me/ratings/songs/${item.id}`,
        attributes: {
          value: newRating
        }
      };

      this.ratings.data.push(rating);
    } else {
      this.ratings.data[currentRatings.indexOf(item.id)].attributes.value = newRating;
    }
  }

  getPopularity(id: string): boolean {
    if (!this.popularity) {
      return false;
    }

    for (const item of this.popularity) {
      if (item === id) {
        return true;
      }
    }
  }

}
