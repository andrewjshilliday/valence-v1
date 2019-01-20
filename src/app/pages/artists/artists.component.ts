import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicPlayerService } from '../../shared/services/music-player.service';
import { MusicApiService } from '../../shared/services/music-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit, OnDestroy {

  artistSubscription: Subscription;
  loading: boolean;
  albums: Array<any>;
  singles: Array<any>;
  liveAlbums: Array<any>;
  compilations: Array<any>;
  topSongs: any;
  artistImage: string;
  artistInfo: any;
  relatedArtists: any;

  sortOptions = [
    ['recommended', 'Recommended'],
    ['releaseDateAsc', 'Release Date (oldest first)'],
    ['releaseDateDesc', 'Release Date (newest first)']
  ];
  sortAlbums = 'recommended';
  sortSingles = 'recommended';
  sortLiveAlbums = 'recommended';
  sortCompilations = 'recommended';

  constructor(private route: ActivatedRoute, public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) { }

  ngOnInit() {
    this.artistSubscription = this.route.params.subscribe(params => {
      this.loadArtist(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.artistSubscription.unsubscribe();
  }

  async loadArtist(id: string) {
    this.loading = true;
    this.musicPlayerService.artist = await this.musicApiService.getArtist(id, this.musicPlayerService.artist);
    this.musicPlayerService.playlists = await this.musicApiService.getPlaylists(id);
    await this.getArtistInfo();
    this.loading = false;

    this.getRelatedArtists();
  }

  sortItems(items: any, sort: string) {
    const sortItems = Object.assign([], items);

    switch (sort) {
      case 'recommended': {
        return sortItems;
      }
      case 'releaseDateAsc': {
        return sortItems.sort(
          (a, b) => new Date(a.attributes.releaseDate).getTime() - new Date(b.attributes.releaseDate).getTime()
        );
      }
      case 'releaseDateDesc': {
        return sortItems.sort(
          (a, b) => new Date(b.attributes.releaseDate).getTime() - new Date(a.attributes.releaseDate).getTime()
        );
      }
    }
  }

  async getArtistInfo() {
    const url = this.musicPlayerService.artist.attributes.url.split('/');
    const name = url[url.length - 2];

    const info = await fetch(environment.musicServiceApi + 'artists/' +
      `${this.musicPlayerService.musicKit.storefrontId}/${name}/${this.musicPlayerService.artist.id}`)
      .then(res => res.json());
    info.description = JSON.parse(info.description);

    this.artistImage = info.imageUrl;
    this.artistInfo = info.description.data;

    let topSongs: any;
    let albumsIds: any;
    let singlesIds: any;
    let liveAlbumsIds: any;
    let compilationsIds: any;

    for (const item of info.description.included) {
      if (item.id.match(this.musicPlayerService.artist.id + '/topSongs')) {
        topSongs = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicPlayerService.artist.id + '/fullAlbums')) {
        albumsIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicPlayerService.artist.id + '/singleAlbums')) {
        singlesIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicPlayerService.artist.id + '/liveAlbums')) {
        liveAlbumsIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicPlayerService.artist.id + '/compilationAlbums')) {
        compilationsIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (topSongs && albumsIds && singlesIds && liveAlbumsIds && compilationsIds) {
        break;
      }
    }

    this.albums = [];
    this.singles = [];
    this.liveAlbums = [];
    this.compilations = [];

    for (const item of this.musicPlayerService.artist.relationships.albums.data) {
      if (albumsIds && albumsIds.indexOf(item.id) > -1) {
        this.albums.push(item);
        continue;
      }
      if (singlesIds && singlesIds.indexOf(item.id) > -1) {
        this.singles.push(item);
        continue;
      }
      if (liveAlbumsIds && liveAlbumsIds.indexOf(item.id) > -1) {
        this.liveAlbums.push(item);
        continue;
      }
      if (compilationsIds && compilationsIds.indexOf(item.id) > -1) {
        this.compilations.push(item);
        continue;
      }
    }

    if (topSongs) {
      this.topSongs = await this.musicPlayerService.musicKit.api.songs(topSongs, {include: 'albums'});
    }
  }

  async getRelatedArtists() {
    this.relatedArtists = null;

    if (!this.artistInfo || !this.artistInfo.relationships.artistContemporaries ||
      !this.artistInfo.relationships.artistContemporaries.data || !this.artistInfo.relationships.artistContemporaries.data.length) {
      return;
    }

    const itemIdArray = this.artistInfo.relationships.artistContemporaries.data.map(i => i.id);
    this.relatedArtists = await this.musicPlayerService.musicKit.api.artists(itemIdArray);

    const promises = this.relatedArtists.map(this.getArtwork.bind(this));
    await Promise.all(promises);
  }

  async getArtwork(artist: any) {
    if (!artist.attributes.artworkUrl) {
      artist.attributes.artworkUrl = await this.musicApiService.getArtistArtwork(artist.attributes.url);
    }
  }

}
