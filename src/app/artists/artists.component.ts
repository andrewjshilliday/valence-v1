import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music.service';
import { environment } from '../../environments/environment';

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

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.artistSubscription = this.route.params.subscribe(params => {
      this.loadArtist(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.artistSubscription.unsubscribe();
  }

  async loadArtist(id: number) {
    this.loading = true;
    await this.musicService.getArtist(id);
    await this.musicService.getPlaylists(id);
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
    const url = this.musicService.artist.attributes.url.split('/');
    const name = url[url.length - 2];

    const info = await fetch(environment.musicServiceApi + 'artists/' +
      `${this.musicService.musicKit.storefrontId}/${name}/${this.musicService.artist.id}`)
      .then(res => res.json());
    info.description = JSON.parse(info.description);

    this.artistImage = info.imageUrl;
    this.artistInfo = info.description.data;

    const included = info.description.included;
    let topSongs: any;
    let albumsIds: any;
    let singlesIds: any;
    let liveAlbumsIds: any;
    let compilationsIds: any;

    for (const item of included) {
      if (item.id.match(this.musicService.artist.id + '/topSongs')) {
        topSongs = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicService.artist.id + '/fullAlbums')) {
        albumsIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicService.artist.id + '/singleAlbums')) {
        singlesIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicService.artist.id + '/liveAlbums')) {
        liveAlbumsIds = item.relationships.content.data.map(i => i.id);
        continue;
      }
      if (item.id.match(this.musicService.artist.id + '/compilationAlbums')) {
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

    for (const item of this.musicService.artist.relationships.albums.data) {
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
      this.topSongs = await this.musicService.musicKit.api.songs(topSongs, {include: 'albums'});
    }
  }

  async getRelatedArtists() {
    this.relatedArtists = null;

    if (!this.artistInfo || !this.artistInfo.relationships.artistContemporaries ||
      !this.artistInfo.relationships.artistContemporaries.data || !this.artistInfo.relationships.artistContemporaries.data.length) {
      return;
    }

    const itemIdArray = this.artistInfo.relationships.artistContemporaries.data.map(i => i.id);
    this.relatedArtists = await this.musicService.musicKit.api.artists(itemIdArray);

    const promises = this.relatedArtists.map(this.getArtwork.bind(this));
    await Promise.all(promises);
  }

  async getArtwork(artist: any) {
    if (!artist.attributes.artworkUrl) {
      artist.attributes.artworkUrl = await this.musicService.getArtistArtwork(artist.attributes.url);
    }
  }

}
