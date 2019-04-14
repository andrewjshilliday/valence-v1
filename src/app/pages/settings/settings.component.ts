import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  bitrate: string;
  enablePlayPause: boolean;
  device: any;
  enablePlaybackRecovery: boolean;
  playbackTimeout: string;

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
    this.bitrate = this.playerService.musicKit.bitrate.toString();
    this.enablePlaybackRecovery = Boolean(JSON.parse(localStorage.getItem('enablePlaybackRecovery')));
    this.playbackTimeout = localStorage.getItem('playbackTimeout');
    this.enablePlayPause = Boolean(JSON.parse(localStorage.getItem('enablePlayPause')));
    this.device = JSON.parse(localStorage.getItem('device'));

    if (!this.device) {
      this.device = {
        name: '',
        id: ''
      };
    }
  }

  changeEnablePlayPause() {
    localStorage.setItem('enablePlayPause', JSON.stringify(this.enablePlayPause));
  }

  changeEnablePlaybackRecovery() {
    localStorage.setItem('enablePlaybackRecovery', JSON.stringify(this.enablePlaybackRecovery));
  }

  saveDevice() {
    if (!this.device.name || !this.device.id || this.device.id.length !== 64) {
      return;
    }

    localStorage.setItem('device', JSON.stringify(this.device));
    this.playerService.device = this.device;
  }

  onPlaybackTimeoutChange() {
    if (!this.playbackTimeout || isNaN(Number(this.playbackTimeout))) {
      return;
    }

    localStorage.setItem('playbackTimeout', this.playbackTimeout);
  }

  showConnectedDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        console.log(devices);
      });
  }

}
