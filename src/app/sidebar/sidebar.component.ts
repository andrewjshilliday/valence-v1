import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  searchHints: any;

  constructor(private router: Router, public musicService: MusicService) { }

  ngOnInit() {
  }

  search(term: string) {
    this.router.navigate(['/searchresults'], { queryParams: { term: term } });
  }

  async getSearchHints(term: string) {
    if (term !== '') {
      this.searchHints = await this.musicService.musicKit.api.searchHints(term);
    }
  }

}
