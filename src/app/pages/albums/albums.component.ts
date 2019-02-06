import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicPlayerService } from '../../shared/services/music-player.service';
import { MusicApiService } from '../../shared/services/music-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  albumSubscription: Subscription;
  loading: boolean;
  albumDuration: number;
  artistAlbums: any;
  relatedAlbums: any;
  albumData: any;
  ratings: any;
  popularity: any;

  constructor(private route: ActivatedRoute, public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) { }

  ngOnInit() {
    this.albumSubscription = this.route.params.subscribe(params => {
      this.loadAlbum(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();
  }

  async loadAlbum(id: string) {
    this.loading = true;
    this.musicPlayerService.album = await this.musicApiService.getAlbum(id, this.musicPlayerService.album);
    this.loading = false;

    this.artistAlbums = null;
    this.getArtistAlbums();

    this.relatedAlbums = null;
    this.getAlbumInfo();

    if (this.musicPlayerService.authorized) {
      this.getRatings();
    }

    if (this.musicPlayerService.album.attributes.artistName === 'Various Artists') {
      this.musicApiService.getRelationships(this.musicPlayerService.album.relationships.tracks.data, 'songs');
    }

    this.albumDuration = 0;

    for (const item of this.musicPlayerService.album.relationships.tracks.data) {
      this.albumDuration += item.attributes.durationInMillis;
    }
  }

  async getArtistAlbums() {
    if (this.musicPlayerService.album.relationships.artists && this.musicPlayerService.album.relationships.artists.data.length) {
      this.artistAlbums = await this.musicPlayerService.musicKit.api.artist(
        this.musicPlayerService.album.relationships.artists.data[0].id, { include: 'albums' }
      );
    }
  }

  async getAlbumInfo() {
    if (!this.musicPlayerService.album.attributes.url) {
      return;
    }

    const url = this.musicPlayerService.album.attributes.url.split('/');
    const name = url[url.length - 2];

    this.albumData = await fetch(environment.musicServiceApi + 'albums/' +
      `${this.musicPlayerService.musicKit.storefrontId}/${name}/${this.musicPlayerService.album.id}`)
      .then(res => res.json());

    if (!this.albumData.resources.data.relationships.listenersAlsoBought.data) {
      return;
    }

    const relatedAlbumsIds = this.albumData.resources.data.relationships.listenersAlsoBought.data.map(i => i.id);
    this.relatedAlbums = await this.musicPlayerService.musicKit.api.albums(relatedAlbumsIds);

    this.getPopulatity();
  }

  /* async getRelatedAlbums() {
    this.relatedAlbums = await this.musicApiService.getRelatedAlbums(this.musicPlayerService.album);
  } */

  async getRatings() {
    this.ratings = await this.musicApiService.getRatings(this.musicPlayerService.album);
  }

  async getPopulatity() {
    this.popularity = [];

    for (const item of this.albumData.resources.included) {
      if (item.type === 'product/album/song') {
        if (item.attributes.popularity >= 0.7) {
          this.popularity.push(item.id);
        }
      }
    }
  }

}
