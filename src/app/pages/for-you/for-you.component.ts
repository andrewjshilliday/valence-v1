import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {

  loading: boolean;

  constructor(public playerService: PlayerService, public apiService: ApiService) { }

  ngOnInit() {
    this.loadRecommenations();
  }

  async loadRecommenations() {
    this.loading = true;
    await this.getRecommenations();
    this.loading = false;

    this.apiService.getRelationships(this.playerService.recentPlayed, 'albums');
    this.apiService.getRelationships(this.playerService.recentPlayed, 'playlists');
    this.apiService.getRelationships(this.playerService.heavyRotation, 'albums');
    this.apiService.getRelationships(this.playerService.heavyRotation, 'playlists');
    this.apiService.getRelationships(this.playerService.recommendations[2].relationships.recommendations.data, 'todaysAlbums');
    this.apiService.getRelationships(this.playerService.recommendations[4].relationships.contents.data, 'albums');
    this.apiService.getRelationships(this.playerService.recommendations[1].relationships.contents.data, 'playlists');
    this.apiService.getRelationships(this.playerService.recommendations[3].relationships.contents.data, 'playlists');
  }

  async getRecommenations(): Promise<any> {
    if (!this.playerService.recommendations || (Date.now() - this.playerService.recommendationsDate) > 60 * 60 * 1000) {
      this.playerService.recommendations = await this.playerService.musicKit.api.recommendations();
      this.playerService.recommendationsDate = Date.now();
    }

    this.playerService.recentPlayed = await this.playerService.musicKit.api.recentPlayed();

    if (this.playerService.recentPlayed.length === 10) {
      const next = await fetch(`${environment.appleMusicApi}/v1/me/recent/played?offset=10`,
        {headers: this.apiService.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data) {
          this.playerService.recentPlayed.push(item);
        }
      }
    }

    this.playerService.heavyRotation = await this.playerService.musicKit.api.historyHeavyRotation();

    if (this.playerService.heavyRotation.length === 10) {
      const next = await fetch(`${environment.appleMusicApi}/v1/me/me/history/heavy-rotation?offset=10`,
        { headers: this.apiService.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data) {
          this.playerService.recentPlayed.push(item);
        }
      }
    }

    if (this.playerService.recommendations[4].next) {
      const next = await fetch(`${environment.appleMusicApi + this.playerService.recommendations[4].next}`,
        { headers: this.apiService.appleApiHeaders() }).then(res => res.json());

      if (next && next.data && next.data.length) {
        for (const item of next.data[0].relationships.contents.data) {
          this.playerService.recommendations[4].relationships.contents.data.push(item);
        }
      }
    }
  }

}
