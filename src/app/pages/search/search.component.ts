import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicPlayerService } from '../../shared/services/music-player.service';
import { MusicApiService } from '../../shared/services/music-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchSubscription: Subscription;
  loading: boolean;
  searchTerm = '';
  searchHints: any;

  constructor(private route: ActivatedRoute, private router: Router,
    public musicPlayerService: MusicPlayerService, public musicApiService: MusicApiService) { }

  ngOnInit() {
    this.searchSubscription = this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];
      this.loadSearch(this.searchTerm);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  async loadSearch(term: string) {
    this.loading = true;
    await this.search(term);
    this.loading = false;

    if (this.musicPlayerService.searchAlbums) {
      this.musicApiService.getRelationships(this.musicPlayerService.searchAlbums, 'albums');
    }
    if (this.musicPlayerService.searchSongs) {
      this.musicApiService.getRelationships(this.musicPlayerService.searchSongs, 'songs');
    }
    if (this.musicPlayerService.searchPlaylists) {
      this.musicApiService.getRelationships(this.musicPlayerService.searchPlaylists, 'playlists');
    }

    if (this.musicPlayerService.searchArtists) {
      const promises = this.musicPlayerService.searchArtists.map(this.getArtwork.bind(this));
      await Promise.all(promises);
    }
  }

  async search(term: string): Promise<any> {
    if (!this.route.snapshot.queryParams.term) {
      this.router.navigate(['/search'], { queryParams: { term: term } });
    }

    if (term === '' || term === this.musicPlayerService.lastSearchTerm) {
      return;
    }

    this.musicPlayerService.searchArtists = null;
    this.musicPlayerService.searchAlbums = null;
    this.musicPlayerService.searchSongs = null;
    this.musicPlayerService.searchPlaylists = null;

    const results = await this.musicPlayerService.musicKit.api.search(term, { types: 'artists,albums,songs,playlists', limit: 20 });

    if (results.artists != null) {
      this.musicPlayerService.searchArtists = results.artists.data;
    }

    if (results.albums != null) {
      this.musicPlayerService.searchAlbums = results.albums.data;
    }

    if (results.songs != null) {
      this.musicPlayerService.searchSongs = results.songs.data;
    }

    if (results.playlists != null) {
      this.musicPlayerService.searchPlaylists = results.playlists.data;
    }

    this.musicPlayerService.lastSearchTerm = term;
  }

  async getSearchHints(term: string) {
    if (term !== '') {
      this.searchHints = await this.musicPlayerService.musicKit.api.searchHints(term);
    }
  }

  async getArtwork(artist: any) {
    if (!artist.attributes.artworkUrl) {
      artist.attributes.artworkUrl = await this.musicApiService.getArtistArtwork(artist.attributes.url);
    }
  }

}
