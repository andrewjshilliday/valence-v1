import { Component, OnInit, DoCheck, Input, IterableDiffers, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-media-item-collection-row',
  templateUrl: './media-item-collection-row.component.html',
  styleUrls: ['./media-item-collection-row.component.scss']
})
export class MediaItemCollectionRowComponent implements OnInit, DoCheck {

  @ViewChild('ps') ps: PerfectScrollbarComponent;
  @Input() collection: any;
  @Input() size: number;
  @Input() todaysAlbums: boolean;
  iterableDiffer: any;

  constructor(public playerService: PlayerService, private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.collection);
    if (changes && this.ps) {
      this.ps.directiveRef.update();
    }
  }

}
