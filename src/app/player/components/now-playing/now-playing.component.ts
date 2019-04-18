import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';
import { ApiService } from '../../../shared/services/api.service';

declare var MusicKit: any;

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {

  lyricsLoading: boolean;

  constructor(public playerService: PlayerService, public apiService: ApiService) {
    this.playerService.musicKit.addEventListener(MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this));
  }

  ngOnInit() {
  }

  async mediaItemDidChange() {
    this.lyricsLoading = true;
    try {
      this.playerService.nowPlayingItemGenius = null;

      this.playerService.nowPlayingItemGenius = await this.apiService.geniusSong(
        this.playerService.nowPlayingItem.artistName, this.playerService.nowPlayingItem.title, true).toPromise();
    } finally {
      if (this.playerService.nowPlayingItemGenius) {
        this.playerService.nowPlayingItemLyrics = this.playerService.nowPlayingItemGenius.lyrics;
      } else {
        this.playerService.nowPlayingItemLyrics = 'Lyrics unavailable';
      }

      this.lyricsLoading = false;
    }
  }

}
