import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../../../shared/services/music-player.service';
import { MusicApiService } from 'src/app/shared/services/music-api.service';

declare var MusicKit: any;

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {

  lyricsLoading: boolean;

  constructor(public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) {
    this.musicPlayerService.musicKit.addEventListener(MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this));
  }

  ngOnInit() {
  }

  async seekToTime(time: number) {
    await this.musicPlayerService.musicKit.player.seekToTime(time);
  }

  toggleShuffle() {
    if (this.musicPlayerService.musicKit.player.shuffleMode === 0) {
      this.musicPlayerService.musicKit.player.shuffleMode = 1;
    } else {
      this.musicPlayerService.musicKit.player.shuffleMode = 0;
    }
  }

  toggleRepeat() {
    if (this.musicPlayerService.musicKit.player.repeatMode === 0) {
      this.musicPlayerService.musicKit.player.repeatMode = 2;
    } else {
      this.musicPlayerService.musicKit.player.repeatMode = 0;
    }
  }

  async mediaItemDidChange() {
    this.lyricsLoading = true;
    await this.musicApiService.getLyrics();
    this.lyricsLoading = false;
  }

}
