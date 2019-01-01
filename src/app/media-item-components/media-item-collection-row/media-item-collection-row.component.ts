import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'src/app/music.service';

@Component({
  selector: 'app-media-item-collection-row',
  templateUrl: './media-item-collection-row.component.html',
  styleUrls: ['./media-item-collection-row.component.css']
})
export class MediaItemCollectionRowComponent implements OnInit {

  @Input() collection: any;
  @Input() size: number;
  @Input() divider: boolean;
  @Input() todaysAlbums: boolean;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
  }

}
