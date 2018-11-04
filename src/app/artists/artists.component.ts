import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit, OnDestroy {

  artistSubscription: Subscription;
  loading: boolean;
  albums: Array<any>;
  tracks: any;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.artistSubscription = this.route.params.subscribe(params => {
      this.loadArtist(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.artistSubscription.unsubscribe();
  }

  async loadArtist(id: number) {
    this.loading = true;
    await this.musicService.getArtist(id);
    await this.musicService.getPlaylists(id);
    this.loading = false;

    this.albums = this.musicService.artist.relationships.albums.data.filter(item => !item.attributes.isSingle);
  }

  reorderAlbums(event) {
    switch (event.currentTarget.selectedIndex) {
      case 0: {
        this.albums = this.musicService.artist.relationships.albums.data.filter(item => !item.attributes.isSingle);
        break;
      }
      case 1: {
        this.albums = this.albums.sort(
          (a, b) => new Date(a.attributes.releaseDate).getTime() - new Date(b.attributes.releaseDate).getTime()
        );
        break;
      }
      case 2: {
        this.albums = this.albums.sort(
          (a, b) => new Date(b.attributes.releaseDate).getTime() - new Date(a.attributes.releaseDate).getTime()
        );
        break;
      }
    }
  }

}
