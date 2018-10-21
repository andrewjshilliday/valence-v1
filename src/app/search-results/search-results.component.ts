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
    await this.musicService.search(term);
    this.loading = false;
  }

}
