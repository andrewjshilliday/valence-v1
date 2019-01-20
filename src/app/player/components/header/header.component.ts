import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../../../shared/services/music-player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public musicPlayerService: MusicPlayerService) { }

  ngOnInit() {
  }

}
