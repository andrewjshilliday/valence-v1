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

  constructor(public musicService: MusicService) { }

  ngOnInit() {
  }

}
