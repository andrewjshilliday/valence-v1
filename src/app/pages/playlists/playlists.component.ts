import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';
import * as $ from 'jquery';

import { Artist } from '../../models/musicKit/artist.model';
import { Rating } from '../../models/musicKit/rating.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  playlistSubscription: Subscription;
  loading: boolean;
  playlistDuration: number;
  artists: Artist[];
  ratings: Rating[];
  isLibraryPlaylist: boolean;

  constructor(private route: ActivatedRoute, public playerService: PlayerService, public apiService: ApiService) { }

  ngOnInit() {
    this.playlistSubscription = this.route.params.subscribe(params => {
      this.loadPlaylist(params['id']);
    });

    $(window).on('resize', function() {
      this.setEditorialNotesStyle();
    }.bind(this));
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }

  async loadPlaylist(id: string) {
    this.loading = true;

    this.isLibraryPlaylist = id.startsWith('p.');
    this.playerService.playlist = await this.apiService.playlist(id, 'artists,tracks').toPromise();
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

  getRatings() {
    if (this.isLibraryPlaylist) {
      return;
    }

    this.apiService.ratings(this.playerService.playlist.relationships.tracks.data.map(i => i.id)).subscribe(res => this.ratings = res);
  }

  getTrackRelationships() {
    if (this.isLibraryPlaylist) {
      return;
    }

    const songIds = this.playerService.playlist.relationships.tracks.data.map(i => i.id);
    this.apiService.songs(songIds, 'artists,albums').subscribe(async res => {
      for (const item of this.playerService.playlist.relationships.tracks.data) {
        for (const result of res) {
          if (item.id === result.id) {
            item.relationships = result.relationships;
            break;
          }
        }
      }

      this.artists = [];
      const artistIds = res.map(r => r.relationships.artists.data[0].id).filter((v, i, a) => a.indexOf(v) === i);
      let offset = 0;

      while (artistIds.slice(offset, offset + 30).length) {
        const artists = await this.apiService.artists(artistIds.slice(offset, offset + 30)).toPromise();
        this.artists.push(...artists);
        offset = offset + 30;
      }

      this.getArtistArtwork(this.artists);
    });
  }

  async getArtistArtwork(artists: Artist[]) {
    const ids = artists.map(a => a.id);
    const observables = [];
    let offset = 0;

    while (ids.slice(offset, offset + 30).length) {
      observables.push(this.apiService.artistsData(ids.slice(offset, offset + 30), true).subscribe(res => {
        for (const a of res) {
          if (a.imageUrl) {
            for (const artist of artists) {
              if (artist.id === a.id) {
                artist.attributes.artwork = this.playerService.generateArtwork(a.imageUrl);
              }
            }
          }
        }
      }));

      offset += 30;
    }

    forkJoin(observables);
  }

  setEditorialNotesStyle() {
    if (!this.playerService.playlist.attributes.description) {
      return;
    }

    $(document).ready(function() {
      if ($('#notes')) {
        const height = $(window).height();
        const notesOffset = $('#notes').offset().top;
        const notesParentOffset = $('#notes').parent().offset().top;
        $('#notes').css('max-height', height  - notesOffset + notesParentOffset - 160);
      }
    });
  }

}
