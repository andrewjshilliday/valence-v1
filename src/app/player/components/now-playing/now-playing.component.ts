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
      this.playerService.geniusNowPlayingItem = null;
      this.playerService.lyricsNowPlayingItem = null;

      [this.playerService.geniusNowPlayingItem, this.playerService.lyricsNowPlayingItem] = await
        this.apiService.getGeniusSong(this.playerService.nowPlayingItem.artistName, this.playerService.nowPlayingItem.title, true);

      if (!this.playerService.lyricsNowPlayingItem) {
        this.playerService.lyricsNowPlayingItem = 'Lyrics unavailable';
      }
    } catch {
      this.playerService.geniusNowPlayingItem = null;
      this.playerService.lyricsNowPlayingItem = 'Lyrics unavailable';
    } finally {
      this.lyricsLoading = false;
    }
  }

}
