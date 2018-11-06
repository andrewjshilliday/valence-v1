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

  top100: any;
  featuredPlaylists: any;
  aListPlaylists: any;
  appleCurators: any;
  curators: any;

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
    this.top100 = await this.musicService.musicKit.api.playlists(Constants.top100Ids);
  }

  async loadFeaturedPlaylists() {
    this.featuredPlaylists = await this.musicService.musicKit.api.playlists(Constants.featuredPlaylistsIds);
    this.loading = false;
  }

  async loadAppleCurators() {
    this.appleCurators = await this.musicService.musicKit.api.appleCurators(Constants.appleCuratorsIds);
  }

  async loadCurators() {
    this.curators = await this.musicService.musicKit.api.curators(Constants.curatorsIds);
  }

  async loadAListPlaylists() {
    this.aListPlaylists = await this.musicService.musicKit.api.playlists(Constants.aListPlaylistsIds);
  }

}
