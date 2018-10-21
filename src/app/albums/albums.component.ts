import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../music.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  albumSubscription: Subscription;
  loading: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.albumSubscription = this.route.params.subscribe(params => {
      this.loadAlbum(+params['id']);
    });
  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();
  }

  async loadAlbum(id: number) {
    this.loading = true;
    await this.musicService.getAlbum(id);
    this.loading = false;
  }

}
