import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'src/app/music.service';

@Component({
  selector: 'app-media-item-collection-list',
  templateUrl: './media-item-collection-list.component.html',
  styleUrls: ['./media-item-collection-list.component.css']
})
export class MediaItemCollectionListComponent implements OnInit {

  @Input() collection: any;
  @Input() showHeader: boolean;
  @Input() showArtistAlbum: boolean;
  @Input() showArtwork: boolean;
  @Input() itemRelationships: any;

  constructor(public musicService: MusicService) { }

  ngOnInit() {
  }

}
