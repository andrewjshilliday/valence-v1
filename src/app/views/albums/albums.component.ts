import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../shared/services/player.service';
import { ApiService } from '../../shared/services/api.service';
import { Utils } from '../../shared/utils';
import * as $ from 'jquery';

import { Artist } from '../../shared/models/musicKit/artist.model';
import { Album } from '../../shared/models/musicKit/album.model';
import { Rating } from '../../shared/models/musicKit/rating.model';
import { AlbumData } from '../../shared/models/album-data.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  albumSubscription: Subscription;
  loading: boolean;
  albumDuration: number;
  artistAlbums: Artist;
  relatedAlbums: Album[];
  albumData: AlbumData;
  ratings: Rating[];
  popularity: any;
  isLibraryAlbum: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public playerService: PlayerService, public apiService: ApiService) { }

  ngOnInit() {
    this.albumSubscription = this.route.params.subscribe(params => {
      this.loadAlbum(params['id']);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    $(window).on('resize', function() {
      this.setEditorialNotesStyle();
    }.bind(this));
  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();
  }

  async loadAlbum(id: string) {
    this.loading = true;

    this.isLibraryAlbum = id.startsWith('l.');
    this.playerService.album = await this.apiService.album(id, 'artists,tracks').toPromise();
    this.setEditorialNotesStyle();

    this.loading = false;

    this.artistAlbums = null;
    this.getArtistAlbums();

    this.relatedAlbums = null;
    this.getAlbumData();

    if (this.playerService.authorized) {
      this.getRatings();
    }

    if (this.playerService.album.attributes.artistName === 'Various Artists') {
      this.apiService.getRelationships(this.playerService.album.relationships.tracks.data, 'songs');
    }

    this.albumDuration = 0;

    for (const item of this.playerService.album.relationships.tracks.data) {
      this.albumDuration += item.attributes.durationInMillis;
    }
  }

  getArtistAlbums() {
    if (this.playerService.album.relationships.artists && this.playerService.album.relationships.artists.data.length) {
      this.apiService.artist(this.playerService.album.relationships.artists.data[0].id, 'albums').subscribe(res => {
        this.artistAlbums = res;

        if (!this.artistAlbums || !this.artistAlbums.relationships) {
          return;
        }

        const itemIdArray = this.artistAlbums.relationships.albums.data.map(i => i.id);

        if (this.isLibraryAlbum) {
          this.apiService.libraryAlbums(0, itemIdArray).subscribe(albumRes => this.artistAlbums.relationships.albums.data = albumRes);
        } else {
          this.apiService.albums(itemIdArray).subscribe(albumRes => this.artistAlbums.relationships.albums.data = albumRes);
        }
      });
    }
  }

  getAlbumData() {
    if (!this.playerService.album.attributes.url) {
      return;
    }

    this.apiService.albumData(this.playerService.album.id).subscribe(res => {
      this.albumData = res;
      this.getPopulatity();

      if (!this.albumData.resources.data.relationships.listenersAlsoBought) {
        return;
      }

      const relatedAlbumsIds = this.albumData.resources.data.relationships.listenersAlsoBought.data.map(i => i.id);
      this.apiService.albums(relatedAlbumsIds).subscribe(albumRes => this.relatedAlbums = albumRes);
    });

  }

  getRatings() {
    if (this.isLibraryAlbum) {
      return;
    }

    this.apiService.ratings(this.playerService.album.relationships.tracks.data.map(i => i.id)).subscribe(res => this.ratings = res);
  }

  getPopulatity() {
    this.popularity = [];

    for (const item of this.albumData.resources.included) {
      if (item.type === 'product/album/song') {
        if (item.attributes.popularity >= 0.7) {
          this.popularity.push(item.id);
        }
      }
    }
  }

  setEditorialNotesStyle() {
    if (!this.playerService.album.attributes.editorialNotes) {
      return;
    }

    $(document).ready(function() {
      if ($('#notes') && $('#notes').offset()) {
        const height = $(window).height();
        const notesOffset = $('#notes').offset().top;
        const notesParentOffset = $('#notes').parent().offset().top;
        $('#notes').css('max-height', height  - notesOffset + notesParentOffset - 160);
      }
    });
  }

  formatTime(ms: number) {
    return Utils.formatTime(ms);
  }

}
