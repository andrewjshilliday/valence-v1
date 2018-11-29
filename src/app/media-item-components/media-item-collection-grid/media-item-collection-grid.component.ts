import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'src/app/music.service';

@Component({
  selector: 'app-media-item-collection-grid',
  templateUrl: './media-item-collection-grid.component.html',
  styleUrls: ['./media-item-collection-grid.component.css']
})
export class MediaItemCollectionGridComponent implements OnInit {

  @Input() collection: any;
  @Input() collectionRelationships: any;
  @Input() numRows: number;
  columns: Array<number>;
  rows: Array<number>;


  constructor(public musicService: MusicService) { }

  ngOnInit() {
    this.columns = Array.from(Array(Math.ceil(this.collection.length / this.numRows)).keys());
    this.rows = Array.from(Array(this.numRows).keys());
  }

}
