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
    if (this.musicService.playbackLoading === true) {
      return;
    }

    await this.musicService.musicKit.player.seekToTime(time);
  }

}
