import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  musicKit: any;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
  }

  setVolume(volume: number) {
    this.musicService.musicKit.player.volume = volume;
  }
}
