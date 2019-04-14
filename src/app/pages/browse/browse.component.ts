import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  loading: boolean;

  constructor(public playerService: PlayerService, public apiService: ApiService) { }

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
    if (!this.playerService.mostPlayed) {
      this.playerService.mostPlayed = await this.apiService.charts('albums,playlists,songs');
    }

    this.loading = false;

    this.apiService.getRelationships(this.playerService.mostPlayed.albums[0].data, 'albums');
    this.apiService.getRelationships(this.playerService.mostPlayed.playlists[0].data, 'playlists');
    this.apiService.getRelationships(this.playerService.mostPlayed.songs[0].data, 'songs');
  }

  async loadtop100() {
    if (!this.playerService.top100) {
      this.playerService.top100 = await this.apiService.playlists(Constants.top100Ids);
    }
  }

  async loadFeaturedPlaylists() {
    if (!this.playerService.featuredPlaylists) {
      this.playerService.featuredPlaylists = await this.apiService.playlists(Constants.featuredPlaylistsIds);
    }
  }

  async loadAppleCurators() {
    if (!this.playerService.appleCurators) {
      this.playerService.appleCurators = await this.apiService.appleCurators(Constants.appleCuratorsIds);
    }
  }

  async loadCurators() {
    if (!this.playerService.curators) {
      this.playerService.curators = await this.apiService.curators(Constants.curatorsIds);
    }
  }

  async loadAListPlaylists() {
    if (!this.playerService.aListPlaylists) {
      this.playerService.aListPlaylists = await this.apiService.playlists(Constants.aListPlaylistsIds);
    }
  }

}
