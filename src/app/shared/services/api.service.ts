import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PlayerService } from './player.service';
import { environment } from '../../../environments/environment';

import { Artist, ArtistResponse } from '../../models/musicKit/artist.model';
import { Album, AlbumResponse } from '../../models/musicKit/album.model';
import { Playlist, PlaylistResponse } from '../../models/musicKit/playlist.model';
import { Song, SongResponse } from '../../models/musicKit/song.model';
import { Curator, CuratorResponse } from '../../models/musicKit/curator.model';
import { Recommendation, RecommendationResponse } from '../../models/musicKit/recommendation.model';
import { Rating, RatingResponse } from '../../models/musicKit/rating.model';
import { ChartResults, ChartResponse } from '../../models/musicKit/chart.model';
import { SearchResults, SearchResponse } from '../../models/musicKit/search.model';
import { SearchHints, SearchHintsResponse } from '../../models/musicKit/search-hints.model';
import { Resource, ResourceResponse } from '../../models/musicKit/common/resource.model';
import { ArtistData, ArtistDataResponse } from '../../models/artist-data.model';
import { AlbumData, AlbumDataResponse } from '../../models/album-data.model';
import { GeniusSong, GeniusSongResponse } from '../../models/genius-song.model';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  storefront: string;

  constructor(public playerService: PlayerService, private http: HttpClient) {
    this.storefront = this.playerService.musicKit.storefrontId;
  }

  async addToLibrary(item: any) {
    await this.playerService.musicKit.api.addToLibrary({ [item.type]: [item.id] });
    alert('Successfully added ' + item.attributes.name + ' to your library');
  }

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

  async getMusicKitData(url: string): Promise<any> {
    const headers = this.appleApiHeaders();
    return await this.http.get(`${environment.appleMusicApi}/${url}`, { headers: headers }).toPromise();
  }

  async artist(id: string, include?: string): Promise<Artist> {
    const isLibraryArtist = id.startsWith('r.');
    let url = `${environment.appleMusicApi}/v1/`;
    url += isLibraryArtist ? `me/library/artists/${id}` : `catalog/${this.storefront}/artists/${id}`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<ArtistResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data[0];
  }

  async artists(ids: string[], include?: string): Promise<Artist[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/artists`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<ArtistResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async libraryArtists(offset: number, ids?: string[], limit?: number, include?: string): Promise<Artist[]> {
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

    const response = await this.http.get<ArtistResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async album(id: string, include?: string): Promise<Album> {
    const isLibraryAlbum = id.startsWith('l.');
    let url = `${environment.appleMusicApi}/v1/`;
    url += isLibraryAlbum ? `me/library/albums/${id}` : `catalog/${this.storefront}/albums/${id}`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<AlbumResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data[0];
  }

  async albums(ids: string[], include?: string): Promise<Album[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/albums`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<AlbumResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async libraryAlbums(offset: number, ids?: string[], limit?: number, include?: string): Promise<Album[]> {
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

    const response = await this.http.get<AlbumResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async playlist(id: string, include?: string): Promise<Playlist> {
    const isLibraryPlaylist = id.startsWith('p.');
    let url = `${environment.appleMusicApi}/v1/`;
    url += isLibraryPlaylist ? `me/library/playlists/${id}` : `catalog/${this.storefront}/playlists/${id}`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<PlaylistResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data[0];
  }

  async playlists(ids: string[], include?: string): Promise<Playlist[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/playlists`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<PlaylistResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async libraryPlaylists(offset: number, limit?: number, include?: string): Promise<Playlist[]> {
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

    const response = await this.http.get<PlaylistResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async songs(ids: string[], include?: string): Promise<Song[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/songs`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<SongResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async librarySongs(offset: number, ids?: string[], limit?: number, include?: string): Promise<Song[]> {
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

    const response = await this.http.get<SongResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async appleCurator(id: string, include?: string): Promise<Curator> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/apple-curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', id);

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<CuratorResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data[0];
  }

  async appleCurators(ids: string[], include?: string): Promise<Curator[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/apple-curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<CuratorResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async curator(id: string, include?: string): Promise<Curator> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', id);

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<CuratorResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data[0];
  }

  async curators(ids: string[], include?: string): Promise<Curator[]> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/curators`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('ids', ids.join(','));

    if (include) {
      params = params.append('include', include);
    }

    const response = await this.http.get<CuratorResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async charts(types: string, genre?: string): Promise<ChartResults> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/charts`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('types', types);

    if (genre) {
      params = params.append('genre', genre);
    }

    const response = await this.http.get<ChartResponse>(url, { headers: headers, params: params }).toPromise();
    return response.results;
  }

  async recommendations(): Promise<Recommendation[]> {
    const url = `${environment.appleMusicApi}/v1/me/recommendations`;
    const headers = this.appleApiHeaders();

    const response = await this.http.get<RecommendationResponse>(url, { headers: headers }).toPromise();
    return response.data;
  }

  async recentPlayed(offset?: number): Promise<Recommendation[]> {
    const url = `${environment.appleMusicApi}/v1/me/recent/played`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (offset) {
      params = params.append('offset', offset.toString());
    }

    const response = await this.http.get<RecommendationResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async heavyRotation(offset?: number): Promise<Recommendation[]> {
    const url = `${environment.appleMusicApi}/v1/me/history/heavy-rotation`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams();

    if (offset) {
      params = params.append('offset', offset.toString());
    }

    const response = await this.http.get<RecommendationResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async libraryRecentlyAdded(offset: number, limit?: number): Promise<Resource[]> {
    const url = `${environment.appleMusicApi}/v1/me/library/recently-added`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('offset', offset.toString());

    if (limit) {
      params = params.append('limit', limit.toString());
    }

    const response = await this.http.get<ResourceResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  async search(term: string, types?: string, limit?: number): Promise<SearchResults> {
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

    const response = await this.http.get<SearchResponse>(url, { headers: headers, params: params }).toPromise();
    return response.results;
  }

  async searchHints(term: string, limit?: number): Promise<SearchHints> {
    const url = `${environment.appleMusicApi}/v1/catalog/${this.storefront}/search/hints`;
    const headers = this.appleApiHeaders();
    let params = new HttpParams()
      .set('term', term);

    if (limit) {
      params = params.append('limit', limit.toString());
    }

    const response = await this.http.get<SearchHintsResponse>(url, { headers: headers, params: params }).toPromise();
    return response.results;
  }

  async ratings(ids: string[]): Promise<Rating[]> {
    const url = `${environment.appleMusicApi}/v1/me/ratings/songs`;
    const headers = this.appleApiHeaders();
    const params = new HttpParams()
      .set('ids', ids.join(','));

    const response = await this.http.get<RatingResponse>(url, { headers: headers, params: params }).toPromise();
    return response.data;
  }

  addRating(id: string, rating: number) {
    const headers = this.appleApiHeaders();

    if (rating !== 0) {
      const body = JSON.stringify({
        type: 'rating',
        attributes: {
          value: rating
        }
      });

      this.http.put(`${environment.appleMusicApi}/v1/me/ratings/songs/${id}`, body, { headers: headers }).subscribe();
    } else {
      this.http.delete(`${environment.appleMusicApi}/v1/me/ratings/songs/${id}`, { headers : headers }).subscribe();
    }
  }

  async getRelationships(collection: any, type: string) {
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

        results = await this.albums(ids, 'artists');

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

        break;
      }
      case 'playlists': {
        ids = collection.filter(i => i.type === 'playlists').map(i => i.id);

        if (!ids || ids.length === 0) {
          return;
        }

        results = await this.playlists(ids, 'curators');

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

        break;
      }
      case 'songs': {
        ids = collection.map(i => i.id);
        results = await this.songs(ids, 'artists,albums');

        for (const item of collection) {
          for (const result of results) {
            if (item.id === result.id) {
              item.relationships = result.relationships;
              break;
            }
          }
        }

        break;
      }
    }
  }

  async artistData(id: string, imageOnly?: boolean): Promise<ArtistData> {
    const url = `${environment.musicServiceApi}/artists`;
    let params = new HttpParams()
      .set('ids', id)
      .set('storefront', this.storefront);

    if (imageOnly) {
      params = params.append('imageOnly', 'true');
    }

    const response = await this.http.get<ArtistDataResponse>(url, { params: params }).toPromise();
    return response.artists[0];
  }

  async artistsData(ids: string[], imageOnly?: boolean): Promise<ArtistData[]> {
    let artistsData: ArtistData[];
    let offset = 0;
    const url = `${environment.musicServiceApi}/artists`;

    while (ids.slice(offset, offset + 30).length) {
      let params = new HttpParams()
        .set('ids', ids.slice(offset, offset + 30).join(','))
        .set('storefront', this.storefront);

      if (imageOnly) {
        params = params.append('imageOnly', 'true');
      }

      const response: any = await this.http.get<ArtistDataResponse>(url, { params: params }).toPromise();

      if (!artistsData) {
        artistsData = response.artists;
      } else {
        artistsData.push(...response.artists);
      }

      offset += 30;
    }

    return artistsData;
  }

  async albumData(id: string): Promise<AlbumData> {
    const url = `${environment.musicServiceApi}/albums`;
    const params = new HttpParams()
      .set('ids', id)
      .set('storefront', this.storefront);

    const response = await this.http.get<AlbumDataResponse>(url, { params: params }).toPromise();
    return response.albums[0];
  }

  async geniusSong(artist: string, song: string, includeLyrics?: boolean): Promise<GeniusSong> {
    const url = `${environment.musicServiceApi}/genius/song`;
    let params = new HttpParams()
      .set('artist', artist)
      .set('song', song);

      if (includeLyrics) {
        params = params.append('includeLyrics', 'true');
      }

    const response = await this.http.get<GeniusSongResponse>(url, { params: params }).toPromise();
    return response.song;
  }

}
