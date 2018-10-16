import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MusicService } from '../music.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artistSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.artistSubscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.musicService.getArtist(id);
      this.musicService.getPlaylists(id);
    });
  }

  ngOnDestroy(): void {
    this.artistSubscription.unsubscribe();
  }
}
