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
    this.loadtop100();
    this.loadFeaturedPlaylists();
    this.loadAppleCurators();
    this.loadCurators();
    this.loadAListPlaylists();
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

}
