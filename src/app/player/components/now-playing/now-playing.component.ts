import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';
import { ApiService } from 'src/app/shared/services/api.service';

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

  async seekToTime(time: number) {
    await this.playerService.musicKit.player.seekToTime(time);
  }

  toggleShuffle() {
    if (this.playerService.musicKit.player.shuffleMode === 0) {
      this.playerService.musicKit.player.shuffleMode = 1;
    } else {
      this.playerService.musicKit.player.shuffleMode = 0;
    }
  }

  toggleRepeat() {
    if (this.playerService.musicKit.player.repeatMode === 0) {
      this.playerService.musicKit.player.repeatMode = 2;
    } else {
      this.playerService.musicKit.player.repeatMode = 0;
    }
  }

  async mediaItemDidChange() {
    this.lyricsLoading = true;
    await this.apiService.getLyrics();
    this.lyricsLoading = false;
  }

}
