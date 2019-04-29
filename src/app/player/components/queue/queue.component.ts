import { Component, OnInit, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlayerService } from '../../../shared/services/player.service';
import { ApiService } from '../../../shared/services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit, AfterViewInit, OnDestroy {

  lyricsLoading: boolean;
  selectedTab: number;

  constructor(public playerService: PlayerService, public apiService: ApiService, public dialogRef: MatDialogRef<QueueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedTab = data.selectedTab;
  }

  ngOnInit() {
    this.apiService.lyricSubject.subscribe(lyricResponse => this.lyricsLoading = lyricResponse.loading);

    const self = this;
    $(window).on('resize', function() { self.setContentSize(); });
  }

  ngAfterViewInit() {
    this.setContentSize();
  }

  ngOnDestroy() {
    this.apiService.lyricSubject.unsubscribe();
  }

  async getLyrics(refresh?: boolean) {
    this.apiService.updateNowPlayingItem(refresh);
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

}
