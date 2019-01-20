import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicPlayerService } from '../../shared/services/music-player.service';
import { MusicApiService } from '../../shared/services/music-api.service';

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

  constructor(private route: ActivatedRoute, public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) { }

  ngOnInit() {
    this.playlistSubscription = this.route.params.subscribe(params => {
      this.loadPlaylist(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }

  async loadPlaylist(id: string) {
    this.loading = true;
    this.musicPlayerService.playlist = await this.musicApiService.getPlaylist(id, this.musicPlayerService.playlist);
    this.loading = false;
    this.getTrackRelationships();

    if (this.musicPlayerService.authorized) {
      this.getRatings();
    }

    this.playlistDuration = 0;

    for (const item of this.musicPlayerService.playlist.relationships.tracks.data) {
      this.playlistDuration += item.attributes.durationInMillis;
    }
  }

  async getRatings() {
    this.ratings = await this.musicApiService.getRatings(this.musicPlayerService.playlist);
  }

  async getTrackRelationships() {
    const songIdArray = this.musicPlayerService.playlist.relationships.tracks.data.map(i => i.id);
    const results = await this.musicPlayerService.musicKit.api.songs(songIdArray, { include: 'artists,albums' });

    for (const item of this.musicPlayerService.playlist.relationships.tracks.data) {
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
      const artists = await this.musicPlayerService.musicKit.api.artists(artistIdArray.slice(offset, offset + 30));

      for (const artist of artists) {
        this.artists.push(artist);
      }

      offset = offset + 30;
    }

    const promises = this.artists.map(this.getArtwork.bind(this));
    await Promise.all(promises);
  }

  async getArtwork(artist: any) {
    if (!artist.attributes.artworkUrl) {
      artist.attributes.artworkUrl = await this.musicApiService.getArtistArtwork(artist.attributes.url);
    }
  }

}
