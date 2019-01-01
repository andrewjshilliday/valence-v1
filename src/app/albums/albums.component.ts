import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../music.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

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

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.albumSubscription = this.route.params.subscribe(params => {
      this.loadAlbum(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();
  }

  async loadAlbum(id: number) {
    this.loading = true;
    await this.musicService.getAlbum(id);
    this.loading = false;

    this.artistAlbums = null;
    this.getArtistAlbums();

    this.relatedAlbums = null;
    this.getRelatedAlbums();

    if (this.musicService.album.attributes.artistName === 'Various Artists') {
      this.getTrackRelationships();
    }

    this.albumDuration = 0;

    for (const item of this.musicService.album.relationships.tracks.data) {
      this.albumDuration += item.attributes.durationInMillis;
    }
  }

  async getArtistAlbums() {
    if (this.musicService.album.relationships.artists && this.musicService.album.relationships.artists.data.length) {
      this.artistAlbums = await this.musicService.musicKit.api.artist(
        this.musicService.album.relationships.artists.data[0].id, { include: 'albums' }
      );
    }
  }

  async getRelatedAlbums() {
    const url = this.musicService.album.attributes.url.split('/');
    const name = url[url.length - 2];

    const info = await fetch(environment.musicServiceApi + 'albums/' +
      `${this.musicService.musicKit.storefrontId}/${name}/${this.musicService.album.id}`)
      .then(res => res.json());
    info.description = JSON.parse(info.description);

    if (!info.description.data.relationships.listenersAlsoBought) {
      return;
    }

    const relatedAlbumsIds = info.description.data.relationships.listenersAlsoBought.data.map(i => i.id);
    this.relatedAlbums = await this.musicService.musicKit.api.albums(relatedAlbumsIds);
  }

  async getTrackRelationships() {
    const songIdArray = this.musicService.album.relationships.tracks.data.map(i => i.id);
    const results = await this.musicService.musicKit.api.songs(songIdArray, { include: 'artists,albums' });

    for (const item of this.musicService.album.relationships.tracks.data) {
      for (const result of results) {
        if (item.id === result.id) {
          item.relationships = result.relationships;
          break;
        }
      }
    }
  }

}
