import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';

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
    await Promise.all([this.getRecommenations(), this.getRecentPlayed(true), this.getHeavyRotation(true)].map(p => p.catch(e => e)));
    this.loading = false;

    await Promise.all([this.getRecentPlayed(false), this.getHeavyRotation(false)].map(p => p.catch(e => e)));

    this.apiService.getRelationships(this.playerService.recentPlayed, 'albums');
    this.apiService.getRelationships(this.playerService.recentPlayed, 'playlists');
    this.apiService.getRelationships(this.playerService.heavyRotation, 'albums');
    this.apiService.getRelationships(this.playerService.heavyRotation, 'playlists');
    this.apiService.getRelationships(this.playerService.recommendations[1].relationships.contents.data, 'playlists');
    this.apiService.getRelationships(this.playerService.recommendations[3].relationships.contents.data, 'playlists');
    this.apiService.getRelationships(this.playerService.recommendations[4].relationships.contents.data, 'albums');
    this.apiService.getRelationships(
      this.playerService.recommendations[2].relationships.recommendations.data[0].relationships.contents.data, 'albums');
    this.apiService.getRelationships(
      this.playerService.recommendations[2].relationships.recommendations.data[1].relationships.contents.data, 'albums');
    this.apiService.getRelationships(
      this.playerService.recommendations[2].relationships.recommendations.data[2].relationships.contents.data, 'albums');
    this.apiService.getRelationships(
      this.playerService.recommendations[2].relationships.recommendations.data[3].relationships.contents.data, 'albums');
  }

  async getRecommenations() {
    if (!this.playerService.recommendations || (Date.now() - this.playerService.recommendationsDate) > 60 * 60 * 1000) {
      this.playerService.recommendations = await this.apiService.recommendations();
      this.playerService.recommendationsDate = Date.now();

      if (this.playerService.recommendations[4].next) {
        const next = await this.apiService.getMusicKitData(this.playerService.recommendations[4].next);

        if (next && next.data && next.data.length) {
          this.playerService.recommendations[4].relationships.contents.data.push(...next.data[0].relationships.contents.data);
        }
      }
    }
  }

  async getRecentPlayed(loadInitial: boolean) {
    if (loadInitial) {
      this.playerService.recentPlayed = await this.apiService.recentPlayed();
    } else {
      while (this.playerService.recentPlayed.length < 30) {
        const next = await this.apiService.recentPlayed(this.playerService.recentPlayed.length);

        if (next && next.length > 0) {
          this.playerService.recentPlayed.push(...next);
        }
      }
    }
  }

  async getHeavyRotation(loadInitial: boolean) {
    if (loadInitial) {
      this.playerService.heavyRotation = await this.apiService.heavyRotation();
    } else {
      while (this.playerService.heavyRotation.length < 30) {
        const next = await this.apiService.heavyRotation(this.playerService.heavyRotation.length);

        if (next && next.length > 0) {
          this.playerService.recentPlayed.push(...next);
        } else {
          break;
        }
      }
    }
  }
}
