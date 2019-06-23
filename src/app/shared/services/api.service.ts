import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PlayerService } from './player.service';
import { NotificationService } from './notification.service';
import { environment } from '../../../environments/environment';

import { Artist, ArtistResponse } from '../models/musicKit/artist.model';
import { Album, AlbumResponse } from '../models/musicKit/album.model';
import { Playlist, PlaylistResponse } from '../models/musicKit/playlist.model';
import { Song, SongResponse } from '../models/musicKit/song.model';
import { Curator, CuratorResponse } from '../models/musicKit/curator.model';
import { Recommendation, RecommendationResponse } from '../models/musicKit/recommendation.model';
import { Rating, RatingResponse } from '../models/musicKit/rating.model';
import { ChartResults, ChartResponse } from '../models/musicKit/chart.model';
import { SearchResults, SearchResponse } from '../models/musicKit/search.model';
import { SearchHints, SearchHintsResponse } from '../models/musicKit/search-hints.model';
import { Resource, ResourceResponse } from '../models/musicKit/common/resource.model';
import { ArtistData, ArtistDataResponse } from '../models/artist-data.model';
import { AlbumData, AlbumDataResponse } from '../models/album-data.model';
import { GeniusSong, GeniusSongResponse } from '../models/genius-song.model';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  storefront: string;

  ratingSubject = new Subject<any>();
  lyricsSubject = new BehaviorSubject<any>(null);

  constructor(public playerService: PlayerService, public notificationService: NotificationService, private http: HttpClient) {
    this.storefront = this.playerService.musicKit.storefrontId;
    this.playerService.musicKit.addEventListener(
      MusicKit.Events.authorizationStatusDidChange, this.authorizationStatusDidChange.bind(this));
  }

  /* async addToLibrary(item: any) {
    await this.playerService.musicKit.api.addToLibrary({ [item.type]: [item.id] });
    alert('Successfully added ' + item.attributes.name + ' to your library');
  } */

  appleApiHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + MusicKit.getInstance().developerToken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    if (this.playerService.musicKit.isAuthorized) {
      headers = headers.append('Music-User-Token', MusicKit.getInstance().musicUserToken);
    }

    return headers;
  }

  getMusicKitData(url: string): Observable<any> {
    const headers = this.appleApiHeaders();
    return this.http.get(`${environment.appleMusicApi}/${url}`, { headers: headers });
  }

  artist(id: string, include?: string): Observable<Artist> {
    const isLibraryArtist = id.startsWith('r.');
    let url = `${environment.appleMusicApi}/v1/`;
    url += isLibraryArtist ? `me/library/artists/${id}` : `catalog/${this.storefront}/artists/${id}`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<ArtistResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data[0]));
  }

  artists(ids: string[], include?: string): Observable<Artist[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/artists`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<ArtistResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  libraryArtists(offset: number, ids?: string[], limit?: number, include?: string): Observable<Artist[]> {
    const url = `${environment.appleMusicApi}/v1/me/library/artists`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('offset', offset.toString());

    if (ids) {
      params = params.append('ids', ids.join(','));
    }
    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<ArtistResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  album(id: string, include?: string): Observable<Album> {
    const isLibraryAlbum = id.startsWith('l.');
    let url = `${environment.appleMusicApi}/v1/`;
    url += isLibraryAlbum ? `me/library/albums/${id}` : `catalog/${this.storefront}/albums/${id}`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<AlbumResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data[0]));
  }

  albums(ids: string[], include?: string): Observable<Album[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/albums`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<AlbumResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  libraryAlbums(offset: number, ids?: string[], limit?: number, include?: string): Observable<Album[]> {
    const url = `${environment.appleMusicApi}/v1/me/library/albums`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('offset', offset.toString());

    if (ids) {
      params = params.append('ids', ids.join(','));
    }
    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<AlbumResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  playlist(id: string, include?: string): Observable<Playlist> {
    const isLibraryPlaylist = id.startsWith('p.');
    let url = `${environment.appleMusicApi}/v1/`;
    url += isLibraryPlaylist ? `me/library/playlists/${id}` : `catalog/${this.storefront}/playlists/${id}`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<PlaylistResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data[0]));
  }

  playlists(ids: string[], include?: string): Observable<Playlist[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/playlists`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<PlaylistResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  libraryPlaylists(offset: number, limit?: number, include?: string): Observable<Playlist[]> {
    const url = `${environment.appleMusicApi}/v1/me/library/playlists`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('offset', offset.toString());

    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<PlaylistResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  songs(ids: string[], include?: string): Observable<Song[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/songs`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<SongResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  librarySongs(offset: number, ids?: string[], limit?: number, include?: string): Observable<Song[]> {
    const url = `${environment.appleMusicApi}/v1/me/library/songs`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('offset', offset.toString());

    if (ids) {
      params = params.append('ids', ids.join(','));
    }
    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<SongResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  appleCurator(id: string, include?: string): Observable<Curator> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/apple-curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', id);

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<CuratorResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data[0]));
  }

  appleCurators(ids: string[], include?: string): Observable<Curator[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/apple-curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<CuratorResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  curator(id: string, include?: string): Observable<Curator> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', id);

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<CuratorResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data[0]));
  }

  curators(ids: string[], include?: string): Observable<Curator[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    return this.http.get<CuratorResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  charts(types: string, genre?: string): Observable<ChartResults> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/charts`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('types', types);

    if (genre) {
      params = params.append('genre', genre);
    }

    return this.http.get<ChartResponse>(url, { headers: headers, params: params }).pipe(map(res => res.results));
  }

  recommendations(): Observable<Recommendation[]> {
    const url = `${environment.appleMusicApi}/v1/me/recommendations`;
    const headers = this.appleApiHeaders();

    return this.http.get<RecommendationResponse>(url, { headers: headers }).pipe(map(res => res.data));
  }

  recentPlayed(offset?: number): Observable<Recommendation[]> {
    const url = `${environment.appleMusicApi}/v1/me/recent/played`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (offset) {
      params = params.append('offset', offset.toString());
    }

    return this.http.get<RecommendationResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  heavyRotation(offset?: number): Observable<Recommendation[]> {
    const url = `${environment.appleMusicApi}/v1/me/history/heavy-rotation`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (offset) {
      params = params.append('offset', offset.toString());
    }

    return this.http.get<RecommendationResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  libraryRecentlyAdded(offset: number, limit?: number): Observable<Resource[]> {
    const url = `${environment.appleMusicApi}/v1/me/library/recently-added`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('offset', offset.toString());

    if (limit) {
      params = params.append('limit', limit.toString());
    }

    return this.http.get<ResourceResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  search(term: string, types?: string, limit?: number): Observable<SearchResults> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/search`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('term', term);

    if (types) {
      params = params.append('types', types);
    }
    if (limit) {
      params = params.append('limit', limit.toString());
    }

    return this.http.get<SearchResponse>(url, { headers: headers, params: params }).pipe(map(res => res.results));
  }

  searchHints(term: string, limit?: number): Observable<SearchHints> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/search/hints`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('term', term);

    if (limit) {
      params = params.append('limit', limit.toString());
    }

    return this.http.get<SearchHintsResponse>(url, { headers: headers, params: params }).pipe(map(res => res.results));
  }

  ratings(ids: string[]): Observable<Rating[]> {
    const url = `${environment.appleMusicApi}/v1/me/ratings/songs`;
    const headers = this.appleApiHeaders();
    const params = new HttpParams()
      .set('ids', ids.join(','));

    return this.http.get<RatingResponse>(url, { headers: headers, params: params }).pipe(map(res => res.data));
  }

  addRating(id: string, rating: number) {
    const url = `${environment.appleMusicApi}/v1/me/ratings/songs/${id}`;
    const headers = this.appleApiHeaders();

    if (rating !== 0) {
      const body = JSON.stringify({
        type: 'rating',
        attributes: {
          value: rating
        }
      });

      this.http.put(url, body, { headers: headers }).subscribe(() => {
        this.ratingSubject.next({ id: id, rating: rating });
      });
    } else {
      this.http.delete(url, { headers : headers }).subscribe(() => {
        this.ratingSubject.next({ id: id, rating: rating });
      });
    }
  }

  async addToLibrary(item: any) {
    /* const url = `${environment.appleMusicApi}/v1/me/library`;
    const headers = this.appleApiHeaders();
    const params = new HttpParams()
      .set(`ids[${item.type}]`, item.id);

    this.http.put(url, null, { headers: headers, params: params }).subscribe(() => {
      this.notificationService.open(`${item.attributes.name} successfully added to library`);
    }); */

    await this.playerService.musicKit.api.addToLibrary({ [item.type]: [item.id] }).then(() => {
      this.notificationService.open(`${item.attributes.name} successfully added to library`);
    });
  }

  getRelationships(collection: any, type: string) {
    if (!collection) {
      return;
    }

    let ids: string[];
    let results: any;

    switch (type) {
      case 'albums': {
        ids = collection.filter(i => i.type === 'albums').map(i => i.id);

        if (!ids || ids.length === 0) {
          return;
        }

        this.albums(ids, 'artists').subscribe(res => {
          results = res;

          for (const item of collection.filter(i => i.type === 'albums')) {
            let index = 0;

            for (const result of results) {
              if (item.id === result.id && result.relationships.artists.data.length) {
                collection.filter(i => i.type === 'albums')[index].relationships = result.relationships;
                break;
              }

              index++;
            }
          }
        });

        break;
      }
      case 'playlists': {
        ids = collection.filter(i => i.type === 'playlists').map(i => i.id);

        if (!ids || ids.length === 0) {
          return;
        }

        this.playlists(ids, 'curators').subscribe(res => {
          results = res;

          for (const item of collection.filter(i => i.type === 'playlists')) {
            let index = 0;

            for (const result of results) {
              if (item.id === result.id && result.relationships.curator.data.length) {
                collection.filter(i => i.type === 'playlists')[index].relationships = result.relationships;
                break;
              }

              index++;
            }
          }
        });

        break;
      }
      case 'songs': {
        ids = collection.map(i => i.id);

        if (!ids || ids.length === 0) {
          return;
        }

        this.songs(ids, 'artists,albums').subscribe(res => {
          results = res;

          for (const item of collection) {
            for (const result of results) {
              if (item.id === result.id) {
                item.relationships = result.relationships;
                break;
              }
            }
          }
        });

        break;
      }
    }
  }

  artistData(id: string, imageOnly?: boolean): Observable<ArtistData> {
    const url = `${environment.musicServiceApi}/artists`;
    let params = new HttpParams()
      .set('ids', id)
      .set('storefront', this.storefront);

    if (imageOnly) {
      params = params.append('imageOnly', 'true');
    }

    return this.http.get<ArtistDataResponse>(url, { params: params }).pipe(map(res => res.artists[0]));
  }

  artistsData(ids: string[], imageOnly?: boolean): Observable<ArtistData[]> {
    const url = `${environment.musicServiceApi}/artists`;
    let params = new HttpParams()
      .set('ids', ids.join(','))
      .set('storefront', this.storefront);

    if (imageOnly) {
      params = params.append('imageOnly', 'true');
    }

    return this.http.get<ArtistDataResponse>(url, { params: params }).pipe(map(res => res.artists));
  }

  albumData(id: string): Observable<AlbumData> {
    const url = `${environment.musicServiceApi}/albums`;
    const params = new HttpParams()
      .set('ids', id)
      .set('storefront', this.storefront);

    return this.http.get<AlbumDataResponse>(url, { params: params }).pipe(map(res => res.albums[0]));
  }

  geniusSong(id: string, artist: string, song: string, includeLyrics?: boolean, refreshLyrics?: boolean): Observable<GeniusSong> {
    const url = `${environment.musicServiceApi}/genius/song`;
    let params = new HttpParams()
      .set('id', id)
      .set('artist', artist)
      .set('song', song);

    if (includeLyrics) {
      params = params.append('includeLyrics', 'true');
    }
    if (refreshLyrics) {
      params = params.append('refreshLyrics', 'true');
    }

    return this.http.get<GeniusSongResponse>(url, { params: params }).pipe(map(res => res.song));
  }

  updateNowPlayingItem(refreshLyrics?: boolean) {
    const id = this.playerService.nowPlayingItem.id;
    const artist = this.playerService.nowPlayingItem.artistName;
    const song = this.playerService.nowPlayingItem.title;

    this.lyricsSubject.next({loading: true});
    this.playerService.nowPlayingItemGenius = null;
    this.geniusSong(id, artist, song , true, refreshLyrics).pipe(finalize(() => {
      this.lyricsSubject.next({loading: false});
    })).subscribe(res => {
      this.playerService.nowPlayingItemGenius = res;
    });
  }

  authorizationStatusDidChange() {
    this.storefront = this.playerService.musicKit.storefrontId;
  }

}
