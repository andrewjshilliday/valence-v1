import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../music.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albumSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.albumSubscription = this.route.params.subscribe(params => { 
      const id = +params['id'];
      this.musicService.getAlbum(id);
    });
  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();
  }
}
