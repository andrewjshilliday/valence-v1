import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../../shared/services/music-player.service';
import { MusicApiService } from 'src/app/shared/services/music-api.service';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {

  loading: boolean;

  constructor(public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) { }

  ngOnInit() {
    this.loadRecommenations();
  }

  async loadRecommenations() {
    this.loading = true;
    await this.getRecommenations();
    this.loading = false;

    this.musicApiService.getRelationships(this.musicPlayerService.recentPlayed, 'albums');
    this.musicApiService.getRelationships(this.musicPlayerService.recentPlayed, 'playlists');
    this.musicApiService.getRelationships(this.musicPlayerService.heavyRotation, 'albums');
    this.musicApiService.getRelationships(this.musicPlayerService.heavyRotation, 'playlists');
    this.musicApiService.getRelationships(this.musicPlayerService.recommendations[2].relationships.recommendations.data, 'todaysAlbums');
    this.musicApiService.getRelationships(this.musicPlayerService.recommendations[4].relationships.contents.data, 'albums');
    this.musicApiService.getRelationships(this.musicPlayerService.recommendations[1].relationships.contents.data, 'playlists');
    this.musicApiService.getRelationships(this.musicPlayerService.recommendations[3].relationships.contents.data, 'playlists');
  }

  async getRecommenations(): Promise<any> {
    if (!this.musicPlayerService.recommendations || (Date.now() - this.musicPlayerService.recommendationsDate) > 60 * 60 * 1000) {
      this.musicPlayerService.recommendations = await this.musicPlayerService.musicKit.api.recommendations();
      this.musicPlayerService.recommendationsDate = Date.now();
    }

    this.musicPlayerService.recentPlayed = await this.musicPlayerService.musicKit.api.recentPlayed();

    if (this.musicPlayerService.recentPlayed.length === 10) {
      const next = await fetch('https://api.music.apple.com/v1/me/recent/played?offset=10',
        {headers: this.musicApiService.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data) {
          this.musicPlayerService.recentPlayed.push(item);
        }
      }
    }

    this.musicPlayerService.heavyRotation = await this.musicPlayerService.musicKit.api.historyHeavyRotation();

    if (this.musicPlayerService.heavyRotation.length === 10) {
      const next = await fetch('https://api.music.apple.com/v1/me/me/history/heavy-rotation?offset=10',
        { headers: this.musicApiService.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data) {
          this.musicPlayerService.recentPlayed.push(item);
        }
      }
    }

    if (this.musicPlayerService.recommendations[4].next) {
      const next = await fetch('https://api.music.apple.com' + this.musicPlayerService.recommendations[4].next,
        { headers: this.musicApiService.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data[0].relationships.contents.data) {
          this.musicPlayerService.recommendations[4].relationships.contents.data.push(item);
        }
      }
    }
  }

}
