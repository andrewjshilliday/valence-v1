import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MusicPlayerService } from '../../services/music-player.service';

@Component({
  selector: 'app-media-item-collection-grid',
  templateUrl: './media-item-collection-grid.component.html',
  styleUrls: ['./media-item-collection-grid.component.css']
})
export class MediaItemCollectionGridComponent implements OnInit {

  @Input() collection: any;
  @Input() numRows: number;
  @Input() showArtist: boolean;
  @Input() divider: boolean;
  columns: Array<number>;
  rows: Array<number>;

  constructor(private router: Router, public musicPlayerService: MusicPlayerService) { }

  ngOnInit() {
    this.columns = Array.from(Array(Math.ceil(this.collection.length / this.numRows)).keys());
    this.rows = Array.from(Array(this.numRows).keys());
  }

  goToAlbum(item: any) {
    this.router.navigate(['/albums', item.relationships.albums.data[0].id]);
  }

}
