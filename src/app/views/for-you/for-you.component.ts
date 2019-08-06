import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss']
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

    if (this.playerService.recentPlayed) {
      this.apiService.getRelationships(this.playerService.recentPlayed, 'albums');
      this.apiService.getRelationships(this.playerService.recentPlayed, 'playlists');
    }
    if (this.playerService.heavyRotation) {
      this.apiService.getRelationships(this.playerService.heavyRotation, 'albums');
      this.apiService.getRelationships(this.playerService.heavyRotation, 'playlists');
    }
    if (this.playerService.recommendations) {
      for (const recommendation of this.playerService.recommendations) {
        this.apiService.getRelationships(recommendation.relationships.contents.data, 'albums');
        this.apiService.getRelationships(recommendation.relationships.contents.data, 'playlists');
      }
    }
  }

  async getRecommenations() {
    if (!this.playerService.recommendations || (Date.now() - this.playerService.recommendationsDate) > 60 * 60 * 1000) {
      this.playerService.recommendations = await this.apiService.recommendations().toPromise();
      this.playerService.recommendationsDate = Date.now();

      if (this.playerService.recommendations[4].next) {
        this.apiService.getMusicKitData(this.playerService.recommendations[4].next).subscribe(res => {
          if (res && res.data && res.data.length) {
            this.playerService.recommendations[4].relationships.contents.data.push(...res.data[0].relationships.contents.data);
          }
        });
      }
    }
  }

  async getRecentPlayed(loadInitial: boolean) {
    if (loadInitial) {
      this.playerService.recentPlayed = await this.apiService.recentPlayed().toPromise();
    } else {
      while (this.playerService.recentPlayed.length < 30) {
        const next = await this.apiService.recentPlayed(this.playerService.recentPlayed.length).toPromise();

        if (next && next.length > 0) {
          this.playerService.recentPlayed.push(...next);
        }
      }
    }
  }

  async getHeavyRotation(loadInitial: boolean) {
    if (loadInitial) {
      this.playerService.heavyRotation = await this.apiService.heavyRotation().toPromise();
    } else {
      while (this.playerService.heavyRotation.length < 30) {
        const next = await this.apiService.heavyRotation(this.playerService.heavyRotation.length).toPromise();

        if (next && next.length > 0) {
          this.playerService.recentPlayed.push(...next);
        } else {
          break;
        }
      }
    }
  }
}
