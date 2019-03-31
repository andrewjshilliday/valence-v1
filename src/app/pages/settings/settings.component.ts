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
  hardwareID: string;

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
    this.bitrate = this.playerService.musicKit.bitrate.toString();
    this.enablePlayPause = Boolean(JSON.parse(localStorage.getItem('enablePlayPause')));
    this.hardwareID = localStorage.getItem('hardwareID');
  }

  changeEnablePlayPause() {
    localStorage.setItem('enablePlayPause', JSON.stringify(this.enablePlayPause));
  }

  saveHardwareID() {
    localStorage.setItem('hardwareID', this.hardwareID);
    this.playerService.deviceHardwareID = this.hardwareID;
  }

  showConnectedDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        console.log(devices);
      });
  }

}
