import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  bitrate: string;
  enablePlayPause: boolean;
  device: any;

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
    this.bitrate = this.playerService.musicKit.bitrate.toString();
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

  saveDevice() {
    if (!this.device.name || !this.device.id || this.device.id.length !== 64) {
      return;
    }

    localStorage.setItem('device', JSON.stringify(this.device));
    this.playerService.device = this.device;
  }

  showConnectedDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        console.log(devices);
      });
  }

}
