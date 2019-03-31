import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';

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

  constructor(private route: ActivatedRoute, public playerService: PlayerService, public apiService: ApiService) { }

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

    this.playerService.artist = await this.apiService.getArtist(id, this.playerService.artist);

    const itemIdArray = this.playerService.artist.relationships.albums.data.filter(i => i.type === 'albums').map(i => i.id);
    this.playerService.artist.relationships.albums.data =
      await this.playerService.musicKit.api.albums(itemIdArray, { include: 'artists' });

    this.apiService.getRelationships(this.playerService.artist.relationships.albums.data, 'albums');
    this.playerService.playlists = await this.apiService.getPlaylists(id);
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
    if (!this.playerService.artist.attributes.url) {
      if (this.playerService.artist.relationships.albums) {
        this.albums = this.playerService.artist.relationships.albums.data;
      }

      return;
    }

    const url = this.playerService.artist.attributes.url.split('/');
    const name = url[url.length - 2];

    const artistData = await this.apiService.getArtistData(name, this.playerService.artist.id);

    this.artistImage = artistData.imageUrl;
    this.artistInfo = artistData.resources.data;

    let topSongs: any;
    let albumsIds: any;
    let singlesIds: any;
    let liveAlbumsIds: any;
    let compilationsIds: any;

    for (const item of artistData.resources.included) {
      if (item.id.match(this.playerService.artist.id + '/topSongs')) {
        topSongs = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.playerService.artist.id + '/fullAlbums')) {
        albumsIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.playerService.artist.id + '/singleAlbums')) {
        singlesIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.playerService.artist.id + '/liveAlbums')) {
        liveAlbumsIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.playerService.artist.id + '/compilationAlbums')) {
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

    for (const item of this.playerService.artist.relationships.albums.data) {
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
      this.topSongs = await this.playerService.musicKit.api.songs(topSongs, {include: 'albums'});
    }
  }

  async getRelatedArtists() {
    this.relatedArtists = null;

    if (!this.artistInfo || !this.artistInfo.relationships.artistContemporaries ||
      !this.artistInfo.relationships.artistContemporaries.data || !this.artistInfo.relationships.artistContemporaries.data.length) {
      return;
    }

    const itemIdArray = this.artistInfo.relationships.artistContemporaries.data.map(i => i.id);
    this.relatedArtists = await this.playerService.musicKit.api.artists(itemIdArray);

    const promises = this.relatedArtists.map(this.getArtwork.bind(this));
    await Promise.all(promises);
  }

  async getArtwork(artist: any) {
    if (!artist.attributes.artworkUrl) {
      artist.attributes.artworkUrl = await this.apiService.getArtistArtwork(artist.attributes.url);
    }
  }

}
