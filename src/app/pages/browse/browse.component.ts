import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
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
      this.playerService.mostPlayed = await this.apiService.charts('albums,playlists,songs').toPromise();
    }

    this.loading = false;

    this.apiService.getRelationships(this.playerService.mostPlayed.albums[0].data, 'albums');
    this.apiService.getRelationships(this.playerService.mostPlayed.playlists[0].data, 'playlists');
    this.apiService.getRelationships(this.playerService.mostPlayed.songs[0].data, 'songs');
  }

  loadtop100() {
    if (!this.playerService.top100) {
      this.apiService.playlists(Constants.top100Ids).subscribe(res => this.playerService.top100 = res);
    }
  }

  loadFeaturedPlaylists() {
    if (!this.playerService.featuredPlaylists) {
      this.apiService.playlists(Constants.featuredPlaylistsIds).subscribe(res => this.playerService.featuredPlaylists = res);
    }
  }

  loadAppleCurators() {
    if (!this.playerService.appleCurators) {
      this.apiService.appleCurators(Constants.appleCuratorsIds).subscribe(res => this.playerService.appleCurators = res);
    }
  }

  loadCurators() {
    if (!this.playerService.curators) {
      this.apiService.curators(Constants.curatorsIds).subscribe(res => this.playerService.curators = res);
    }
  }

  loadAListPlaylists() {
    if (!this.playerService.aListPlaylists) {
      this.apiService.playlists(Constants.aListPlaylistsIds).subscribe(res => this.playerService.aListPlaylists = res);
    }
  }

}
