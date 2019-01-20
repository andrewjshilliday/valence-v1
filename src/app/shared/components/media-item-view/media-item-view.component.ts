import { Component, OnInit, Input } from '@angular/core';
import { MusicPlayerService } from '../../services/music-player.service';

@Component({
  selector: 'app-media-item-view',
  templateUrl: './media-item-view.component.html',
  styleUrls: ['./media-item-view.component.css']
})
export class MediaItemViewComponent implements OnInit {

  @Input() item: any;
  @Input() light: boolean;

  constructor(public musicPlayerService: MusicPlayerService) { }

  ngOnInit() {
  }

}
