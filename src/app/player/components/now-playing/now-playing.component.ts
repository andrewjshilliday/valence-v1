import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QueueComponent } from '../queue/queue.component';
import { PlayerService } from '../../../shared/services/player.service';
import { ApiService } from '../../../shared/services/api.service';
import { Utils } from '../../../shared/utils';

import { Rating } from '../../../shared/models/musicKit/rating.model';

declare var MusicKit: any;

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {

  nowPlayingRating: Rating;
  dialogRef: MatDialogRef<QueueComponent>;
  queueSelectedTab: number;
  canRefreshLyrics: boolean;
  ratingSubscription: Subscription;

  constructor(public playerService: PlayerService, public apiService: ApiService, public dialog: MatDialog) {
    this.playerService.musicKit.addEventListener(MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this));
  }

  ngOnInit() {
    this.ratingSubscription = this.apiService.ratingSubject.subscribe(ratingResponse => {
      if (ratingResponse.id === this.playerService.nowPlayingItem.id) {
        this.nowPlayingRating = {
          id: ratingResponse.id,
          type: 'ratings',
          href: `/v1/me/ratings/songs/${ratingResponse.id}`,
          attributes: {
            value: ratingResponse.rating
          }
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.ratingSubscription.unsubscribe();
  }

  mediaItemDidChange() {
    this.getLyrics();
    this.getRating();
    this.canRefreshLyrics = true;
  }

  async getLyrics() {
    this.apiService.updateNowPlayingItem();
  }

  getRating() {
    this.apiService.ratings(Array.of(this.playerService.nowPlayingItem.id)).subscribe(res => {
      this.nowPlayingRating = res[0];
    });
  }

  changeRating(rating: number) {
    this.apiService.addRating(this.playerService.nowPlayingItem.id, rating);
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(QueueComponent, {
      width: '498px',
      height: '80vh',
      position: {
        top: '10vh'
      },
      data: { selectedTab: this.queueSelectedTab, canRefreshLyrics: this.canRefreshLyrics },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.queueSelectedTab = this.dialogRef.componentInstance.selectedTab;
      this.canRefreshLyrics = this.dialogRef.componentInstance.canRefreshLyrics;
    });
  }

  formatTime(ms: number) {
    return Utils.formatTime(ms);
  }

}
