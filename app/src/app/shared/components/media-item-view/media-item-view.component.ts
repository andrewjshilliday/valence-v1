import { Component, OnInit, Input, ElementRef } from '@angular/core';
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
  isLibraryResource: boolean;
  backgroundColor = 'none';
  artworkImage = 'placeholder.jpeg';
  artworkPlaceholderImage = './assets/images/placeholder-transparent.png';
  isExplicit: boolean;

  constructor(public playerService: PlayerService, private router: Router, public element: ElementRef) { }

  ngOnInit() {
    this.isLibraryResource = this.item.type.includes('library');

    if (this.item.attributes) {
      if (this.item.attributes.artwork) {
        this.artworkImage = this.playerService.formatArtwork(this.item.attributes.artwork, 400);
        if (this.item.attributes.artwork.bgColor) {
          this.backgroundColor = `#${this.item.attributes.artwork.bgColor}`;
        }
      }
      this.isExplicit = this.item.attributes.contentRating === 'explicit';
    }

    if (this.isLibraryResource || this.item.type.includes('artist')) {
      this.artworkPlaceholderImage = './assets/images/placeholder.jpeg';
    }
  }

  play(item: any, event: Event) {
    event.stopPropagation();
    this.playerService.playItem(item);
  }

  navigate(item: any) {
    if (item.type.includes('albums')) {
      this.router.navigateByUrl(`/albums/${item.id}`);
    } else if (item.type.includes('playlists')) {
      this.router.navigateByUrl(`/playlists/${item.id}`);
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
