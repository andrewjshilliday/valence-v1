import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../../shared/services/player.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  searchHints: any;

  constructor(private router: Router, public playerService: PlayerService) { }

  ngOnInit() {
  }

  search(term: string) {
    this.router.navigate(['/search'], { queryParams: { term: term } });
  }

  async getSearchHints(term: string) {
    if (term !== '') {
      this.searchHints = await this.playerService.musicKit.api.searchHints(term);
    }
  }

}
