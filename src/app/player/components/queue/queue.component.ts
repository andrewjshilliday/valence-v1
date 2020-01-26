import { Component, OnInit, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerService } from '../../../shared/services/player.service';
import { ApiService } from '../../../shared/services/api.service';
import * as $ from 'jquery';

import { ThemeService } from 'src/app/shared/themes';

declare var MusicKit: any;

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit, AfterViewInit, OnDestroy {

  lyricsLoading: boolean;
  lyricsSubscription: Subscription;
  selectedTab: number;
  canRefreshLyrics: boolean;

  constructor(public playerService: PlayerService, public apiService: ApiService, public dialogRef: MatDialogRef<QueueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private themeService: ThemeService) {
    this.playerService.musicKit.addEventListener(MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this));
    this.selectedTab = data.selectedTab;
    this.canRefreshLyrics = data.canRefreshLyrics;
  }

  ngOnInit() {
    this.setBackground();
    this.lyricsSubscription = this.apiService.lyricsSubject.subscribe(lyricsResponse => this.lyricsLoading = lyricsResponse.loading);

    const self = this;
    $(window).on('resize', function() { self.setContentSize(); });
  }

  ngAfterViewInit() {
    this.setContentSize();
  }

  ngOnDestroy() {
    this.lyricsSubscription.unsubscribe();
  }

  async getLyrics(refresh?: boolean) {
    this.apiService.updateNowPlayingItem(refresh);
    this.canRefreshLyrics = false;
  }

  setContentSize() {
    $(document).ready(function() {
      const height = $('.mat-dialog-container').height();
      const contentHeight = height - 60;
      $('.queue').css('height', contentHeight);
      $('.history').css('height', contentHeight);
      $('.lyrics').css('height', contentHeight);
    });
  }

  setSelectedTab(tab: number) {
    this.selectedTab = tab;
  }

  mediaItemDidChange() {
    this.canRefreshLyrics = true;
  }

  setBackground() {
    switch (this.themeService.getActiveTheme().name) {
      case 'dark': {
        const html = document.getElementsByTagName('mat-dialog-container')[0] as HTMLElement;
        if (html) {
          html.style.cssText = '--background: rgba(51,51,51,1)';
        }
        break;
      }
      case 'light': {
        const html = document.getElementsByTagName('mat-dialog-container')[0] as HTMLElement;
        if (html) {
          html.style.cssText = '--background: rgba(255,255,255,1)';
        }
        break;
      }
      case 'midnight': {
        const html = document.getElementsByTagName('mat-dialog-container')[0] as HTMLElement;
        if (html) {
          html.style.cssText = '--background: rgba(10, 31, 51, 1)';
        }
        break;
      }
    }
  }

}
