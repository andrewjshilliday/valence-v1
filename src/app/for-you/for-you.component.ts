import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {

  constructor(public musicService: MusicService) { }

  ngOnInit() {
    this.musicService.getRecommenations();
  }

}
