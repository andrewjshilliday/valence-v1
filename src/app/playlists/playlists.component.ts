import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  playlistSubscription: Subscription;
  loading: boolean;
  playlistDuration: number;
  trackRelationships: Array<any>;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

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
    await this.musicService.getPlaylist(id);
    this.loading = false;
    this.getTrackRelationships();

    this.playlistDuration = 0;

    for (const item of this.musicService.playlist.relationships.tracks.data) {
      this.playlistDuration += item.attributes.durationInMillis;
    }
  }

  async getTrackRelationships() {
    const songIdArray = this.musicService.playlist.relationships.tracks.data.map(i => i.id);
    const results = await this.musicService.musicKit.api.songs(songIdArray, { include: 'artists,albums' });
    this.trackRelationships = [];

    for (const item of results) {
      this.trackRelationships.push([item.id, item.relationships.artists.data[0].id, item.relationships.albums.data[0].id]);
    }
  }

}
