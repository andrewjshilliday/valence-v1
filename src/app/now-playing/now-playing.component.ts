import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {

  constructor(public musicService: MusicService) { }

  ngOnInit() {
  }

  async seekToTime(time: number) {
    /* if (this.musicService.playbackLoading === true) {
      return;
    } */

    /* if (!this.musicService.player) */

    await this.musicService.musicKit.player.seekToTime(time);
  }

  toggleShuffle() {
    if (this.musicService.musicKit.player.shuffleMode === 0) {
      this.musicService.musicKit.player.shuffleMode = 1;
    } else {
      this.musicService.musicKit.player.shuffleMode = 0;
    }
  }

  toggleRepeat() {
    if (this.musicService.musicKit.player.repeatMode === 0) {
      this.musicService.musicKit.player.repeatMode = 2;
    } else {
      this.musicService.musicKit.player.repeatMode = 0;
    }
  }

}
