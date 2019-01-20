import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../../../shared/services/music-player.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {

  constructor(public musicPlayerService: MusicPlayerService) { }

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

}
