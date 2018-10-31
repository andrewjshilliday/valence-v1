import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, public musicService: MusicService) { }

  ngOnInit() {
  }

  search(term: string) {
    this.router.navigate(['/searchresults'], { queryParams: { term: term } });
  }

}
