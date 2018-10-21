import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public musicService: MusicService) { }

  ngOnInit() {
  }

  async playStation() {
    const station = await this.musicService.musicKit.api.station('ra.'.concat('1435351497'));
    this.musicService.playItem(station);
  }

}
