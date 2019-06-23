import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { ThemeService } from '../../shared/themes';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  theme: string;
  bitrate: string;
  enablePlayPause: boolean;
  device: any;
  enablePlaybackRecovery: boolean;
  playbackTimeout: string;

  constructor(public playerService: PlayerService, private themeService: ThemeService) { }

  ngOnInit() {
    this.theme = localStorage.getItem('theme');
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

  setTheme(theme: string) {
    switch (theme) {
      case 'light': {
        this.theme = theme;
        this.themeService.setTheme('light');
        break;
      }
      case 'dark': {
        this.theme = theme;
        this.themeService.setTheme('dark');
        break;
      }
    }
    localStorage.setItem('theme', theme);
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
