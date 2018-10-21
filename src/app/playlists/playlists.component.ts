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
  }

}
