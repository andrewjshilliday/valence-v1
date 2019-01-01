import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  loading: boolean;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
    this.loadBrowse();
  }

  loadBrowse() {
    this.loading = true;
    this.loadMostPlayed();
    this.loadtop100();
    this.loadFeaturedPlaylists();
    this.loadAppleCurators();
    this.loadCurators();
    this.loadAListPlaylists();
  }

  async loadMostPlayed() {
    if (!this.musicService.mostPlayed) {
      this.musicService.mostPlayed = await this.musicService.musicKit.api.charts(null, { types: 'albums,playlists,songs' });
    }

    this.getItemRelationships(this.musicService.mostPlayed.albums[0].data, 'albums');
    this.getItemRelationships(this.musicService.mostPlayed.playlists[0].data, 'playlists');
    this.getItemRelationships(this.musicService.mostPlayed.songs[0].data, 'songs');
  }

  async loadtop100() {
    if (!this.musicService.top100) {
      this.musicService.top100 = await this.musicService.musicKit.api.playlists(Constants.top100Ids);
    }
  }

  async loadFeaturedPlaylists() {
    if (!this.musicService.featuredPlaylists) {
      this.musicService.featuredPlaylists = await this.musicService.musicKit.api.playlists(Constants.featuredPlaylistsIds);
    }

    this.loading = false;
  }

  async loadAppleCurators() {
    if (!this.musicService.appleCurators) {
      this.musicService.appleCurators = await this.musicService.musicKit.api.appleCurators(Constants.appleCuratorsIds);
    }
  }

  async loadCurators() {
    if (!this.musicService.curators) {
      this.musicService.curators = await this.musicService.musicKit.api.curators(Constants.curatorsIds);
    }
  }

  async loadAListPlaylists() {
    if (!this.musicService.aListPlaylists) {
      this.musicService.aListPlaylists = await this.musicService.musicKit.api.playlists(Constants.aListPlaylistsIds);
    }
  }

  async getItemRelationships(collection: any, type: string) {
    let itemIdArray: any;
    let results: any;

    switch (type) {
      case 'albums': {
        itemIdArray = collection.map(i => i.id);
        results = await this.musicService.musicKit.api.albums(itemIdArray, { include: 'artists' });

        for (const item of collection) {
          let index = 0;

          for (const result of results) {
            if (item.id === result.id && result.relationships.artists.data.length) {
              collection[index].relationships = result.relationships;
              break;
            }

            index++;
          }
        }

        break;
      }
      case 'playlists': {
        itemIdArray = collection.map(i => i.id);
        results = await this.musicService.musicKit.api.playlists(itemIdArray, { include: 'curators' });

        for (const item of collection) {
          let index = 0;

          for (const result of results) {
            if (item.id === result.id && result.relationships.curator.data.length) {
              collection[index].relationships = result.relationships;
              break;
            }

            index++;
          }
        }

        break;
      }
      case 'songs': {
        itemIdArray = collection.map(i => i.id);
        results = await this.musicService.musicKit.api.songs(itemIdArray, { include: 'artists,albums' });

        for (const item of collection) {
          for (const result of results) {
            if (item.id === result.id) {
              item.relationships = result.relationships;
              break;
            }
          }
        }

        break;
      }
    }
  }

}
