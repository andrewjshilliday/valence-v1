import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PlayerService } from './player.service';
import { environment } from '../../../environments/environment';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public playerService: PlayerService, private http: HttpClient) { }

  async getArtist(id: string, include?: Array<string>, artist?: any): Promise<any> {
    if (artist && artist.id === id) {
      return artist;
    }

    const isLibraryResource = id.startsWith('r.');
    artist = null;

    if (isLibraryResource) {
      artist = await this.playerService.musicKit.api.library.artist(id);
    } else {
      artist = await this.playerService.musicKit.api.artist(id);
    }

    return artist;
  }

  async getArtistAlbums(id: string, albums?: any): Promise<any> {
    const isLibraryResource = id.startsWith('r.');
    albums = null;

    if (isLibraryResource) {
      albums = await this.playerService.musicKit.api.library.artist(id, { include: 'albums' });
    } else {
      albums = await this.playerService.musicKit.api.artist(id, { include: 'albums' });
    }

    return albums;
  }

  async getAlbum(id: string, include?: string, album?: any): Promise<any> {
    if (album && album.id === id) {
      return album;
    }

    const isLibraryResource = id.startsWith('l.');
    album = null;

    if (isLibraryResource) {
      album = await this.playerService.musicKit.api.library.album(id, { include: 'artists' });
    } else {
      album = await this.playerService.musicKit.api.album(id, { include: 'songs' });
    }

    return album;
  }

  async getPlaylist(id: string, playlist?: any): Promise<any> {
    if (playlist && playlist.id === id) {
      return playlist;
    }

    const isLibraryResource = id.startsWith('p.');
    playlist = null;

    if (isLibraryResource) {
      playlist = await this.playerService.musicKit.api.library.playlist(id, { include: 'tracks' });
    } else {
      playlist = await this.playerService.musicKit.api.playlist(id, { include: 'curators' });
    }

    return playlist;
  }

  async getPlaylists(id: string): Promise<any> {
    let playlists = null;
    const isLibraryResource = id.startsWith('r.');

    if (isLibraryResource) {
      return await this.playerService.musicKit.api.library.artist(id, { include: 'playlists' });
    } else {
      try {
        playlists = await this.playerService.musicKit.api.artist(id, { include: 'playlists' });
      } finally {
        return playlists;
      }
    }
  }

  async addToLibrary(item: any) {
    await this.playerService.musicKit.api.addToLibrary({ [item.type]: [item.id] });
    alert('Successfully added ' + item.attributes.name + ' to your library');
  }

  async getRelationships(collection: any, type: string) {
    if (!collection) {
      return;
    }

    let itemIdArray: any;
    let results: any;

    switch (type) {
      case 'albums': {
        itemIdArray = collection.filter(i => i.type === 'albums').map(i => i.id);

        if (!itemIdArray || itemIdArray.length === 0) {
          return;
        }

        results = await this.playerService.musicKit.api.albums(itemIdArray, { include: 'artists' });

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
      case 'todaysAlbums': {
        itemIdArray = [];

        for (const recommendation of collection) {
          for (const item of recommendation.relationships.contents.data) {
            itemIdArray.push(item.id);
          }
        }

        results = await this.playerService.musicKit.api.albums(itemIdArray, { include: 'artists' });

        for (const recommendation of collection) {
          for (const item of recommendation.relationships.contents.data) {
            for (const result of results) {
              if (item.id === result.id) {
                item.relationships = result.relationships;
                continue;
              }
            }
          }
        }

        break;
      }
      case 'playlists': {
        itemIdArray = collection.filter(i => i.type === 'playlists').map(i => i.id);

        if (!itemIdArray || itemIdArray.length === 0) {
          return;
        }

        results = await this.playerService.musicKit.api.playlists(itemIdArray, { include: 'curators' });

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
        itemIdArray = collection.map(i => i.id);
        results = await this.playerService.musicKit.api.songs(itemIdArray, { include: 'artists,albums' });

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

  appleApiHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + MusicKit.getInstance().developerToken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Music-User-Token', MusicKit.getInstance().musicUserToken);
  }

  async getMusicKitData(url: string): Promise<any> {
    const headers = this.appleApiHeaders();
    return await this.http.get(`${environment.appleMusicApi}/${url}`, { headers: headers }).toPromise();
  }

  async getRecentPlayed(offset: number): Promise<any> {
    const headers = this.appleApiHeaders();
    return await this.http.get(`${environment.appleMusicApi}/v1/me/recent/played?offset=${offset}`, { headers: headers }).toPromise();
  }

  async getHeavyRotation(offset: number): Promise<any> {
    const headers = this.appleApiHeaders();
    return await this.http.get(
      `${environment.appleMusicApi}/v1/me/history/heavy-rotation?offset=${offset}`, { headers: headers }).toPromise();
  }

  async getRatings(collection: any): Promise<any> {
    let url = `${environment.appleMusicApi}/v1/me/ratings/songs?ids=`;
    const collectionIds = collection.relationships.tracks.data.map(i => i.id);
    url += collectionIds.join(',');

    const headers = this.appleApiHeaders();
    return await this.http.get(url, { headers: headers }).toPromise();
  }

  addRating(item: any, rating: number) {
    const headers = this.appleApiHeaders();

    if (rating !== 0) {
      const body = JSON.stringify({
        type: 'rating',
        attributes: {
          value: rating
        }
      });

      this.http.put(`${environment.appleMusicApi}/v1/me/ratings/songs/${item.id}`, body, { headers: headers }).subscribe();
    } else {
      this.http.delete(`${environment.appleMusicApi}/v1/me/ratings/songs/${item.id}`, { headers : headers }).subscribe();
    }
  }

  async getArtistData(ids: Array<string>, imageOnly?: boolean): Promise<any> {
    const url = `${environment.musicServiceApi}/artists`;
    let params = new HttpParams()
      .set('ids', ids.join(','))
      .set('storefront', this.playerService.musicKit.storefrontId);

    if (imageOnly) {
      params = params.append('imageOnly', 'true');
    }

    return await this.http.get(url, { params: params }).toPromise();
  }

  async getAlbumData(ids: Array<string>): Promise<any> {
    const url = `${environment.musicServiceApi}/albums`;
    const params = new HttpParams()
      .set('ids', ids.join(','))
      .set('storefront', this.playerService.musicKit.storefrontId);

    return await this.http.get(url, { params: params }).toPromise();
  }

  async getGeniusSong(artist: string, song: string, includeLyrics?: boolean): Promise<any> {
    const url = `${environment.musicServiceApi}/genius/song`;
    let params = new HttpParams()
      .set('artist', artist)
      .set('song', song);

      if (includeLyrics) {
        params = params.append('includeLyrics', 'true');
      }

    const response: any = await this.http.get(url, { params: params }).toPromise().catch(e => e);
    return response.response && response.response.song ? response.response.song : null;
  }

}
