import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../../shared/services/music-player.service';
import { MusicApiService } from '../../shared/services/music-api.service';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  loading: boolean;

  constructor(public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) { }

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
    if (!this.musicPlayerService.mostPlayed) {
      this.musicPlayerService.mostPlayed = await this.musicPlayerService.musicKit.api.charts(null, { types: 'albums,playlists,songs' });
    }

    this.loading = false;

    this.musicApiService.getRelationships(this.musicPlayerService.mostPlayed.albums[0].data, 'albums');
    this.musicApiService.getRelationships(this.musicPlayerService.mostPlayed.playlists[0].data, 'playlists');
    this.musicApiService.getRelationships(this.musicPlayerService.mostPlayed.songs[0].data, 'songs');
  }

  async loadtop100() {
    if (!this.musicPlayerService.top100) {
      this.musicPlayerService.top100 = await this.musicPlayerService.musicKit.api.playlists(Constants.top100Ids);
    }
  }

  async loadFeaturedPlaylists() {
    if (!this.musicPlayerService.featuredPlaylists) {
      this.musicPlayerService.featuredPlaylists = await this.musicPlayerService.musicKit.api.playlists(Constants.featuredPlaylistsIds);
    }
  }

  async loadAppleCurators() {
    if (!this.musicPlayerService.appleCurators) {
      this.musicPlayerService.appleCurators = await this.musicPlayerService.musicKit.api.appleCurators(Constants.appleCuratorsIds);
    }
  }

  async loadCurators() {
    if (!this.musicPlayerService.curators) {
      this.musicPlayerService.curators = await this.musicPlayerService.musicKit.api.curators(Constants.curatorsIds);
    }
  }

  async loadAListPlaylists() {
    if (!this.musicPlayerService.aListPlaylists) {
      this.musicPlayerService.aListPlaylists = await this.musicPlayerService.musicKit.api.playlists(Constants.aListPlaylistsIds);
    }
  }

}
