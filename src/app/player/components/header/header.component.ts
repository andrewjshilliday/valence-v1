import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
  }

}
