import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music.service';
import { Utils } from '../utils/utils';

declare var $: any;

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

  nextPlaylistsUrl: string;
  getNextPlaylists: boolean;

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

    if (this.curator.relationships.playlists.next) {
      this.getNextPlaylists = true;
      this.loadPlaylists(this.curator.relationships.playlists.next);
    }

    if (this.curator.type === 'apple-curators') {
      this.getAppleFeaturedPlaylist();
    }

    if (!this.featuredPlaylistId) {
      this.featuredPlaylistId = this.curatorPlaylists[0].id;
    }

    this.featuredPlaylist = await this.musicService.musicKit.api.playlist(this.featuredPlaylistId);

    this.loading = false;
  }

  async loadPlaylists(url: string): Promise<any> {
    this.nextPlaylistsUrl = url;

    if (this.getNextPlaylists) {
      const playlists = await fetch('https://api.music.apple.com' + url, { headers: Utils.appleApiHeaders() }).then(res => res.json());

      if (playlists && playlists.data && playlists.data.length) {
        for (const playlist of playlists.data) {
          this.curatorPlaylists.push(playlist);
        }

        if (playlists.next) {
          this.nextPlaylistsUrl = playlists.next;
          this.loadPlaylists(playlists.next);
        } else {
          this.nextPlaylistsUrl = null;
        }
      }

      this.getNextPlaylists = false;
    }
  }

  loadNextPlaylists() {
    this.getNextPlaylists = true;
    this.loadPlaylists(this.nextPlaylistsUrl);
  }

  getAppleFeaturedPlaylist() {
    switch (this.curator.id) {
      case '976439528': { /* blues */
        this.featuredPlaylistId = 'pl.a9faca07cf8f47e19f1819b0f5a2e765';
        break;
      }
      case '988581516': { /* rock */
        this.featuredPlaylistId = 'pl.c690c42617be4e90b603187f3ce265e5';
        break;
      }
      case '988556214': { /* alternative */
        this.featuredPlaylistId = 'pl.0b593f1142b84a50a2c1e7088b3fb683';
        break;
      }
      case '988588080': { /* pop */
        this.featuredPlaylistId = 'pl.5ee8333dbe944d9f9151e97d92d1ead9';
        break;
      }
      case '989061185': { /* hip-hop */
        this.featuredPlaylistId = 'pl.abe8ba42278f4ef490e3a9fc5ec8e8c5';
        break;
      }
      case '976439542': { /* jazz */
        this.featuredPlaylistId = 'pl.07405f59596b402385451fa14695eec4';
        break;
      }
      case '988583890': { /* r&b/soul */
        this.featuredPlaylistId = 'pl.b7ae3e0a28e84c5c96c4284b6a6c70af';
        break;
      }
      case '989074778': { /* dance */
        this.featuredPlaylistId = 'pl.6bf4415b83ce4f3789614ac4c3675740';
        break;
      }
      case '988658201': { /* metal */
        this.featuredPlaylistId = 'pl.51c1d571cc7b484eb1dead1939811f2d';
        break;
      }
      case '989076708': { /* electronic */
        this.featuredPlaylistId = 'pl.4705ab1ed97c4f4bb54f48940faf5623';
        break;
      }
      case '989071074': { /* classical */
        this.featuredPlaylistId = 'pl.66c17ed5cc754856b944a9150483e375';
        break;
      }
      case '976439534': { /* country */
        this.featuredPlaylistId = 'pl.87bb5b36a9bd49db8c975607452bfa2b';
        break;
      }
      case '982347996': { /* new-artists */
        this.featuredPlaylistId = 'pl.704f234023a543dfb4bfb34b426c27d1';
        break;
      }
      case '988658197': { /* k-pop */
        this.featuredPlaylistId = 'pl.48229b41bbfc47d7af39dae8e8b5276e';
        break;
      }
      case '976439552': { /* reggae */
        this.featuredPlaylistId = 'pl.e75fb4f0f6f649a89f7c28ef4cc0442f';
        break;
      }
      case '988578699': { /* singer/songwriter */
        this.featuredPlaylistId = 'pl.8e78f32951a4462f9f4d369c006bc97d';
        break;
      }
      case '988656348': { /* african */
        this.featuredPlaylistId = 'pl.a0794db8bc6f45888834fa708a674987';
        break;
      }
      case '976439529': { /* inspirational */
        this.featuredPlaylistId = 'pl.fecfa8a26ea44ad581d4fe501892c8ff';
        break;
      }
      case '976439587': { /* world */
        this.featuredPlaylistId = 'pl.ae51374a1fc6439596fdf79a575a871b';
        break;
      }
      case '988578275': { /* stage & screen */
        this.featuredPlaylistId = 'pl.244c649d1443463c96da02b6726b04ae';
        break;
      }
      case '1053601584': { /* christmas */
        this.featuredPlaylistId = 'pl.b0e04e25887741ea845e1d5c88397fd4';
        break;
      }
      case '989066661': { /* childrens-music */
        this.featuredPlaylistId = 'pl.0e75ae3fb97a4fe2aee9b6bbedd020ff';
        break;
      }
    }
  }

}
