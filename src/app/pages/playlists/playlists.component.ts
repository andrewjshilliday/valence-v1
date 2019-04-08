import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  playlistSubscription: Subscription;
  loading: boolean;
  playlistDuration: number;
  artists: any;
  ratings: any;

  constructor(private route: ActivatedRoute, public playerService: PlayerService, public apiService: ApiService) { }

  ngOnInit() {
    this.playlistSubscription = this.route.params.subscribe(params => {
      this.loadPlaylist(params['id']);
    });

    window.addEventListener('resize', function () {
      let resizeTimer: any;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        this.setEditorialNotesStyle();
      }.bind(this), 250);
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }

  async loadPlaylist(id: string) {
    this.loading = true;
    this.playerService.playlist = await this.apiService.getPlaylist(id, this.playerService.playlist);
    this.setEditorialNotesStyle();
    this.loading = false;

    this.getTrackRelationships();

    if (this.playerService.authorized) {
      this.getRatings();
    }

    this.playlistDuration = 0;

    for (const item of this.playerService.playlist.relationships.tracks.data) {
      this.playlistDuration += item.attributes.durationInMillis;
    }
  }

  async getRatings() {
    this.ratings = await this.apiService.getRatings(this.playerService.playlist);
  }

  async getTrackRelationships() {
    const songIdArray = this.playerService.playlist.relationships.tracks.data.map(i => i.id);
    const results = await this.playerService.musicKit.api.songs(songIdArray, { include: 'artists,albums' });

    for (const item of this.playerService.playlist.relationships.tracks.data) {
      for (const result of results) {
        if (item.id === result.id) {
          item.relationships = result.relationships;
          break;
        }
      }
    }

    let offset = 0;
    this.artists = [];
    const artistIdArray = Array.from(new Set(results.map(r => r.relationships.artists.data[0].id)));

    while (artistIdArray[offset]) {
      const artists = await this.playerService.musicKit.api.artists(artistIdArray.slice(offset, offset + 30));

      for (const artist of artists) {
        this.artists.push(artist);
      }

      offset = offset + 30;
    }

    this.getArtistArtwork(this.artists);
  }

  async getArtistArtwork(artists: Array<any>) {
    const artistIds = artists.map(a => a.id);
    const resp = await this.apiService.getArtistData(artistIds, true);

    for (const a of resp.artists) {
      if (a.imageUrl) {
        for (const artist of artists) {
          if (artist.id === a.id) {
            artist.attributes.artwork = this.playerService.generateArtwork(a.imageUrl);
          }
        }
      }
    }
  }

  setEditorialNotesStyle() {
    if (!this.playerService.playlist.attributes.description) {
      return;
    }

    $( document ).ready(function() {
      if ($('#notes')) {
        const height = $(window).height();
        const notesOffset = $('#notes').offset().top;
        const notesParentOffset = $('#notes').parent().offset().top;
        $('#notes').css('max-height', height  - notesOffset + notesParentOffset - 174);
      }
    });
  }

}
