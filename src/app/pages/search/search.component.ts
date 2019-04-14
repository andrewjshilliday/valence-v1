import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';

import { Artist } from '../../models/musicKit/artist.model';
import { SearchHints } from '../../models/musicKit/search-hints.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchSubscription: Subscription;
  loading: boolean;
  searchTerm = '';
  searchHints: SearchHints;

  constructor(private route: ActivatedRoute, private router: Router, public playerService: PlayerService, public apiService: ApiService) { }

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

    if (this.playerService.searchResults.albums) {
      this.apiService.getRelationships(this.playerService.searchResults.albums.data, 'albums');
    }
    if (this.playerService.searchResults.songs) {
      this.apiService.getRelationships(this.playerService.searchResults.songs.data, 'songs');
    }
    if (this.playerService.searchResults.playlists) {
      this.apiService.getRelationships(this.playerService.searchResults.playlists.data, 'playlists');
    }

    if (this.playerService.searchResults.artists) {
      this.getArtistArtwork(this.playerService.searchResults.artists.data);
    }
  }

  async search(term: string): Promise<any> {
    if (!this.route.snapshot.queryParams.term) {
      this.router.navigate(['/search'], { queryParams: { term: term } });
    }

    if (term === '' || (this.playerService.searchResults && term === this.playerService.searchResults.term)) {
      return;
    }

    this.playerService.searchResults = null;

    const results = await this.apiService.search(term, undefined, 20);
    results.term = term;
    this.playerService.searchResults = results;
  }

  async getSearchHints(term: string) {
    if (term !== '') {
      this.searchHints = await this.apiService.searchHints(term, 10);
    }
  }

  async getArtistArtwork(artists: Artist[]) {
    const artistIds = artists.map(a => a.id);
    const artistsData = await this.apiService.artistsData(artistIds, true);

    for (const a of artistsData) {
      if (a.imageUrl) {
        for (const artist of artists) {
          if (artist.id === a.id) {
            artist.attributes.artwork = this.playerService.generateArtwork(this.playerService.formatArtwork(a.imageUrl, 500));
          }
        }
      }
    }
  }

}
