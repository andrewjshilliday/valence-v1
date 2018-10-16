import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlistSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.playlistSubscription = this.route.params.subscribe(params => { 
      let id: string = params['id'];
      this.musicService.getPlaylist(id); 
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
  }
}
