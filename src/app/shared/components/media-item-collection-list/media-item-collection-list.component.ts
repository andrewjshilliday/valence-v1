import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ApiService } from '../../services/api.service';
import { Rating } from '../../../models/musicKit/rating.model';

@Component({
  selector: 'app-media-item-collection-list',
  templateUrl: './media-item-collection-list.component.html',
  styleUrls: ['./media-item-collection-list.component.css']
})
export class MediaItemCollectionListComponent implements OnInit {

  @Input() collection: any;
  @Input() ratings: Rating[];
  @Input() popularity: any;
  @Input() showHeader: boolean;
  @Input() showArtist: boolean;
  @Input() showAlbum: boolean;
  @Input() showArtwork: boolean;

  tracks: any;
  collectionRatings: any;
  collectionDuration = 0;

  constructor(public playerService: PlayerService, public apiService: ApiService) { }

  ngOnInit() {
    if (this.collection.relationships && this.collection.relationships.tracks) {
      this.tracks = this.collection.relationships.tracks.data;

      for (const item of this.collection.relationships.tracks.data) {
        this.collectionDuration += item.attributes.durationInMillis;
      }
    } else {
      this.tracks = this.collection;
    }
  }

  getRating(item: any): number {
    if (!item || !this.ratings) {
      return 0;
    }

    for (const rating of this.ratings) {
      if (item.id === rating.id && rating.attributes.value === 1) {
        return rating.attributes.value;
      }
    }

    return 0;
  }

  addRating(id: any, oldRating: number, newRating: number) {
    this.apiService.addRating(id, newRating);

    const currentRatings = this.ratings.map(r => r.id);

    if (currentRatings.indexOf(id) === -1) {
      const rating = {
        id: id,
        type: 'ratings',
        href: `/v1/me/ratings/songs/${id}`,
        attributes: {
          value: newRating
        }
      };

      this.ratings.push(rating);
    } else {
      this.ratings[currentRatings.indexOf(id)].attributes.value = newRating;
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
