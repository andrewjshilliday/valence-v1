import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-media-item-view',
  templateUrl: './media-item-view.component.html',
  styleUrls: ['./media-item-view.component.scss']
})
export class MediaItemViewComponent implements OnInit {

  @Input() item: any;
  @Input() light: boolean;
  @Input() showOptions: boolean;

  constructor(public playerService: PlayerService, private router: Router) { }

  ngOnInit() {
  }

  play(item: any, event: Event) {
    event.stopPropagation();
    this.playerService.playItem(item);
  }

  navigate(item: any) {
    if (item.type.includes('albums')) {
      if (item.type.includes('library')) {
        this.router.navigateByUrl(`/library/albums/${item.id}`);
      } else {
        this.router.navigateByUrl(`/albums/${item.id}`);
      }
    } else if (item.type.includes('playlists')) {
      if (item.type.includes('library')) {
        this.router.navigateByUrl(`/library/playlists/${item.id}`);
      } else {
        this.router.navigateByUrl(`/playlists/${item.id}`);
      }
    } else if (item.type.includes('artists')) {
      this.router.navigateByUrl(`/artists/${item.id}`);
    } else if (item.type.includes('curators')) {
      if (item.type === 'apple-curators') {
        this.router.navigateByUrl(`/curators/apple/${item.id}`);
      } else {
        this.router.navigateByUrl(`/curators/user/${item.id}`);
      }
    }
  }

}
