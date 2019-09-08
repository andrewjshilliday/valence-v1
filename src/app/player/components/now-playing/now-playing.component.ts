import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSlider } from '@angular/material/slider';
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

  @ViewChild(MatSlider, {static: false}) slider: MatSlider;
  scrubbingProgress: boolean;

  constructor(public playerService: PlayerService, public apiService: ApiService, public dialog: MatDialog) {
    this.playerService.musicKit.addEventListener(MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this));
  }

  ngOnInit() {
    this.ratingSubscription = this.apiService.ratingSubject.subscribe(ratingResponse => {
      if (this.playerService.nowPlayingItem && ratingResponse.id === this.playerService.nowPlayingItem.id) {
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
    this.canRefreshLyrics = true;

    if (this.playerService.authorized) {
      this.getRating();
    }
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

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60).toString().padStart(2, '0');
  }

  showLabel(show: boolean) {
    if (show || this.scrubbingProgress) {
      this.slider._elementRef.nativeElement.focus();
    } else {
      this.slider._elementRef.nativeElement.blur();
    }
  }

  setScrubbingProgress(value: boolean) {
    this.scrubbingProgress = value;
    this.showLabel(value);
  }

}
