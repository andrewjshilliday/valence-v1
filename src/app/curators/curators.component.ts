import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-curators',
  templateUrl: './curators.component.html',
  styleUrls: ['./curators.component.css']
})
export class CuratorsComponent implements OnInit {

  curatorSubscription: Subscription;
  loading: boolean;
  curator: any;
  curatorPlaylists: any;
  @Input() featuredPlaylistId: any;
  featuredPlaylist: any;

  constructor(private route: ActivatedRoute, private router: Router, public musicService: MusicService) { }

  ngOnInit() {
    this.curatorSubscription = this.route.params.subscribe(params => {
      this.loadCurator(params['type'], params['id']);
    });
  }

  async loadCurator(type: string, id: string) {
    this.loading = true;

    if (type === 'apple') {
      this.curator = await this.musicService.musicKit.api.appleCurator(id);
      this.curatorPlaylists = await this.musicService.musicKit.api.playlists(this.curator.relationships.playlists.data.map(i => i.id));
    } else {
      this.curator = await this.musicService.musicKit.api.curator(id);
      this.curatorPlaylists = await this.musicService.musicKit.api.playlists(this.curator.relationships.playlists.data.map(i => i.id));
    }

    if (!this.featuredPlaylistId) {
      this.featuredPlaylistId = this.curatorPlaylists[0].id;
    }

    this.featuredPlaylist = await this.musicService.musicKit.api.playlist(this.featuredPlaylistId);

    this.loading = false;
  }

}
