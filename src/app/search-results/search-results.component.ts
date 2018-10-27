import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  searchSubscription: Subscription;
  loading: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.searchSubscription = this.route.queryParams.subscribe(params => {
      this.loadSearchResults(params['term']);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  async loadSearchResults(term) {
    this.loading = true;
    await this.search(term);
    this.loading = false;
  }

  async search(query: string): Promise<any> {
    if (query === '' || query === this.musicService.lastSearchQuery) {
      return;
    }

    this.musicService.artists = null;
    this.musicService.albums = null;
    this.musicService.songs = null;
    this.musicService.playlists = null;

    const results = await this.musicService.musicKit.api.search(query, { types: 'artists,albums,songs,playlists', limit: 20 });

    if (results.artists != null) {
      this.musicService.artists = results.artists.data;
    }

    if (results.albums != null) {
      this.musicService.albums = results.albums.data;
    }

    if (results.songs != null) {
      this.musicService.songs = results.songs.data;
    }

    if (results.playlists != null) {
      this.musicService.playlists = results.playlists.data;
    }

    this.musicService.lastSearchQuery = query;
  }

}
