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

  constructor(private route: ActivatedRoute, private router: Router, private musicService: MusicService) {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.musicService.getArtist(id);
    }
  }

  ngOnInit() {
    this.artistSubscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.musicService.getArtist(id);
    });
  }

  ngOnDestroy(): void {
    this.artistSubscription.unsubscribe();
  }
}
