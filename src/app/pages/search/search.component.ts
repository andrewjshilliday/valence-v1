import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';

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
    public playerService: PlayerService, public apiService: ApiService) { }

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

    if (this.playerService.searchAlbums) {
      this.apiService.getRelationships(this.playerService.searchAlbums, 'albums');
    }
    if (this.playerService.searchSongs) {
      this.apiService.getRelationships(this.playerService.searchSongs, 'songs');
    }
    if (this.playerService.searchPlaylists) {
      this.apiService.getRelationships(this.playerService.searchPlaylists, 'playlists');
    }

    if (this.playerService.searchArtists) {
      const promises = this.playerService.searchArtists.map(this.getArtwork.bind(this));
      await Promise.all(promises);
    }
  }

  async search(term: string): Promise<any> {
    if (!this.route.snapshot.queryParams.term) {
      this.router.navigate(['/search'], { queryParams: { term: term } });
    }

    if (term === '' || term === this.playerService.lastSearchTerm) {
      return;
    }

    this.playerService.searchArtists = null;
    this.playerService.searchAlbums = null;
    this.playerService.searchSongs = null;
    this.playerService.searchPlaylists = null;

    const results = await this.playerService.musicKit.api.search(term, { types: 'artists,albums,songs,playlists', limit: 20 });

    if (results.artists != null) {
      this.playerService.searchArtists = results.artists.data;
    }

    if (results.albums != null) {
      this.playerService.searchAlbums = results.albums.data;
    }

    if (results.songs != null) {
      this.playerService.searchSongs = results.songs.data;
    }

    if (results.playlists != null) {
      this.playerService.searchPlaylists = results.playlists.data;
    }

    this.playerService.lastSearchTerm = term;
  }

  async getSearchHints(term: string) {
    if (term !== '') {
      this.searchHints = await this.playerService.musicKit.api.searchHints(term);
    }
  }

  async getArtwork(artist: any) {
    if (!artist.attributes.artworkUrl) {
      artist.attributes.artworkUrl = await this.apiService.getArtistArtwork(artist.attributes.url);
    }
  }

}
