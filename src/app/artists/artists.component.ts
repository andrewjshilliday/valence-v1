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
  singles: Array<any>;
  liveAlbums: Array<any>;
  compilations: Array<any>;
  topSongs: any;
  artistImage: string;
  artistInfo: any;
  relatedArtists: any;

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
    await this.getArtistInfo();
    this.loading = false;

    this.getRelatedArtists();
    this.albums = this.musicService.artist.relationships.albums.data.filter(item => !item.attributes.isSingle);
  }

  sortAlbums(event) {
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

  async getArtistInfo() {
    const url = this.musicService.artist.attributes.url.split('/');
    const name = url[url.length - 2];

    const info = await fetch(`https://musicservicev1.herokuapp.com/artists/` +
      `${this.musicService.musicKit.storefrontId}/${name}/${this.musicService.artist.id}`)
      .then(res => res.json());
    info.description = JSON.parse(info.description);

    this.artistImage = info.imageUrl;
    this.artistInfo = info.description.data;

    const included = info.description.included;
    let topSongs: any;

    for (const item of included) {
      if (item.id.match(this.musicService.artist.id + '/topSongs')) {
        topSongs = item;
        break;
      }
    }

    const itemIdArray = topSongs.relationships.content.data.map(i => i.id);
    this.topSongs = await this.musicService.musicKit.api.songs(itemIdArray, {include: 'albums'});
  }

  async getRelatedArtists() {
    if (!this.artistInfo) {
      if (!this.artistInfo.relationships.artistContemporaries.data || !this.artistInfo.relationships.artistContemporaries.data.length) {
        return;
      }
    }

    const itemIdArray = this.artistInfo.relationships.artistContemporaries.data.map(i => i.id);
    this.relatedArtists = await this.musicService.musicKit.api.artists(itemIdArray);

    const promises = this.relatedArtists.map(this.getArtwork.bind(this));
    await Promise.all(promises);
  }

  async getArtwork(artist: any) {
    if (!artist.attributes.artworkUrl) {
      artist.attributes.artworkUrl = await this.musicService.getArtistArtwork(artist.attributes.url);
    }
  }

}
