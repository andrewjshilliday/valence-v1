import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from 'src/app/shared/services/music-player.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  bitrate: string;
  enablePlayPause: boolean;
  hardwareID: string;

  constructor(public musicPlayerService: MusicPlayerService) { }

  ngOnInit() {
    this.bitrate = this.musicPlayerService.musicKit.bitrate.toString();
    this.enablePlayPause = Boolean(JSON.parse(localStorage.getItem('enablePlayPause')));
    this.hardwareID = localStorage.getItem('hardwareID');
  }

  changeEnablePlayPause() {
    localStorage.setItem('enablePlayPause', JSON.stringify(this.enablePlayPause));
  }

  saveHardwareID() {
    localStorage.setItem('hardwareID', this.hardwareID);
  }

  showConnectedDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        console.log(devices);
      });
  }

}
