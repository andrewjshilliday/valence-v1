import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../shared/services/player.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {

  librarySubscription: Subscription;
  loading: boolean;
  type: string;

  recentlyAdded: Array<any>;
  artists: Array<any>;
  albums: Array<any>;
  songs: Array<any>;
  playlists: Array<any>;

  constructor(private route: ActivatedRoute, public playerService: PlayerService) { }

  ngOnInit() {
    this.librarySubscription = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.loadLibrary();
    });
  }

  ngOnDestroy(): void {
    this.librarySubscription.unsubscribe();
  }

  async loadLibrary() {
    this.recentlyAdded = [];
    this.artists = [];
    this.albums = [];
    this.songs = [];
    this.playlists = [];

    switch (this.type) {
      case 'recently-added': {
        await this.getLibraryResource('recently-added');
        break;
      }
      case 'artists': {
        await this.getLibraryResource('artists');
        break;
      }
      case 'albums': {
        await this.getLibraryResource('albums');
        break;
      }
      case 'songs': {
        await this.getLibraryResource('songs');
        break;
      }
      case 'playlists': {
        await this.getLibraryResource('playlists');
        break;
      }
    }
  }

  async getLibraryResource(type: string, offset?: number) {
    if (!offset) {
      offset = 0;
    }

    this.loading = true;
    let results: any;

    switch (type) {
      case 'recently-added': {
        results = await this.playerService.musicKit.api.library.collection('recently-added', null, { offset: offset, limit: 10 });
        this.recentlyAdded = this.recentlyAdded.concat(results);

        if (results.length !== 0 && this.recentlyAdded.length < 100) {
          if (this.type !== 'recently-added') {
            return;
          }

          this.getLibraryResource(type, offset + 10);
          return;
        } else {
          this.loading = false;
        }

        break;
      }
      case 'artists': {
        results = await this.playerService.musicKit.api.library.artists(null, { limit: 100, offset: offset });
        this.artists = this.artists.concat(results);

        if (results.length !== 0) {
          if (this.type !== 'artists') {
            return;
          }

          this.getLibraryResource(type, offset + 100);
          return;
        } else {
          this.loading = false;
        }

        break;
      }
      case 'albums': {
        results = await this.playerService.musicKit.api.library.albums(null, { offset: offset });
        this.albums = this.albums.concat(results);

        if (results.length !== 0) {
          if (this.type !== 'albums') {
            return;
          }

          this.getLibraryResource(type, offset + 50);
          return;
        } else {
          this.loading = false;
        }

        break;
      }
      case 'songs': {
        results = await this.playerService.musicKit.api.library.songs(null, { offset: offset });
        this.songs = this.songs.concat(results);

        if (results.length !== 0) {
          if (this.type !== 'songs') {
            return;
          }

          this.getLibraryResource(type, offset + 100);
          return;
        } else {
          this.loading = false;
        }

        break;
      }
      case 'playlists': {
        results = await this.playerService.musicKit.api.library.playlists(null, { offset: offset });
        this.playlists = this.playlists.concat(results);

        if (results.length !== 0) {
          if (this.type !== 'playlists') {
            return;
          }

          this.getLibraryResource(type, offset + 100);
          return;
        } else {
          this.loading = false;
        }

        break;
      }
    }
  }

}
