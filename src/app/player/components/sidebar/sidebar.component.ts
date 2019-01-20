import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicPlayerService } from '../../../shared/services/music-player.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  searchHints: any;

  constructor(private router: Router, public musicPlayerService: MusicPlayerService) { }

  ngOnInit() {
  }

  search(term: string) {
    this.router.navigate(['/search'], { queryParams: { term: term } });
  }

  async getSearchHints(term: string) {
    if (term !== '') {
      this.searchHints = await this.musicPlayerService.musicKit.api.searchHints(term);
    }
  }

}
