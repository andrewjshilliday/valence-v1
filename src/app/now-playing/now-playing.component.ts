import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

declare var MusicKit: any;
import '../../assets/musickit.js';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {
  seeking: boolean = false;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
  }

  async seekToTime(time: number) {
    if (this.seeking === true)
      return;

    this.seeking = true;
    await this.musicService.musicKit.player.seekToTime(time);
    this.seeking = false;
  }
}
