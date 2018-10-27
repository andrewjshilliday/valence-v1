import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {

  loading: boolean;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
    this.loadRecommenations();
  }

  async loadRecommenations() {
    this.loading = true;
    await this.getRecommenations();
    this.loading = false;
  }

  async getRecommenations(): Promise<any> {
    if (!this.musicService.recommendations || (Date.now() - this.musicService.recommendationsDate) > 60 * 60 * 1000) {
      this.musicService.recommendations = await this.musicService.musicKit.api.recommendations();
      this.musicService.recommendationsDate = Date.now();
    }

    if (!this.musicService.recentPlayed) {
      this.musicService.recentPlayed = await this.musicService.musicKit.api.recentPlayed();
    }

    if (!this.musicService.heavyRotation) {
      this.musicService.heavyRotation = await this.musicService.musicKit.api.historyHeavyRotation();
    }
  }

}
