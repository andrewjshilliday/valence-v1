import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-media-item-collection-grid',
  templateUrl: './media-item-collection-grid.component.html',
  styleUrls: ['./media-item-collection-grid.component.scss']
})
export class MediaItemCollectionGridComponent implements OnInit {

  @Input() collection: any;
  @Input() numRows: number;
  @Input() showArtist: boolean;
  columns: number[];
  rows: number[];

  constructor(private router: Router, public playerService: PlayerService) { }

  ngOnInit() {
    this.columns = Array.from(Array(Math.ceil(this.collection.length / this.numRows)).keys());
    this.rows = Array.from(Array(this.numRows).keys());
  }

  goToAlbum(item: any) {
    this.router.navigate(['/albums', item.relationships.albums.data[0].id]);
  }

}
