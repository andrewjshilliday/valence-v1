import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-media-item-view',
  templateUrl: './media-item-view.component.html',
  styleUrls: ['./media-item-view.component.scss']
})
export class MediaItemViewComponent implements OnInit {

  @Input() item: any;
  @Input() light: boolean;

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
  }

}
