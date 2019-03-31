import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { environment } from '../../../environments/environment';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public playerService: PlayerService) { }

  async getArtist(id: string, artist?: any): Promise<any> {
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

  appleApiHeaders() {
    return new Headers({
      Authorization: 'Bearer ' + MusicKit.getInstance().developerToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': '' + MusicKit.getInstance().musicUserToken
    });
  }

  async getMusicKitData(url: string): Promise<any> {
    return await fetch(`${environment.appleMusicApi}/${url}`,
      { headers: this.appleApiHeaders() }).then(res => res.json());
  }

  async getRecentPlayed(offset: number): Promise<any> {
    return await fetch(`${environment.appleMusicApi}/v1/me/recent/played?offset=${offset}`,
      {headers: this.appleApiHeaders() }).then(res => res.json());
  }

  async getHeavyRotation(offset: number): Promise<any> {
    return await fetch(`${environment.appleMusicApi}/v1/me/history/heavy-rotation?offset=${offset}`,
      { headers: this.appleApiHeaders() }).then(res => res.json());
  }

  async getRatings(collection: any): Promise<any> {
    let url = `${environment.appleMusicApi}/v1/me/ratings/songs?ids=`;

    for (const item of collection.relationships.tracks.data) {
      url += item.id;

      if (collection.relationships.tracks.data[collection.relationships.tracks.data.length - 1].id !== item.id) {
        url += ',';
      }
    }

    return await fetch(url, { headers: this.appleApiHeaders() }).then(res => res.json());
  }

  addRating(item: any, rating: number) {
    if (rating !== 0) {
      fetch(`${environment.appleMusicApi}/v1/me/ratings/songs/${item.id}`, {
        method: 'PUT',
        headers: this.appleApiHeaders(),
        body: JSON.stringify({
          type: 'rating',
          attributes: {
            value: rating
          }
        })
      });
    } else {
      fetch(`${environment.appleMusicApi}/v1/me/ratings/songs/${item.id}`, {
        method: 'DELETE',
        headers: this.appleApiHeaders(),
      });
    }
  }

  async getRelatedAlbums(album: any): Promise<any> {
    const url = album.attributes.url.split('/');
    const name = url[url.length - 2];

    const info = await fetch(`${environment.musicServiceApi}/albums/
      ${this.playerService.musicKit.storefrontId}/${name}/${album.id}`)
      .then(res => res.json());
    info.description = JSON.parse(info.description);

    if (!info.description.data.relationships.listenersAlsoBought) {
      return;
    }

    const relatedAlbumsIds = info.description.data.relationships.listenersAlsoBought.data.map(i => i.id);
    return await this.playerService.musicKit.api.albums(relatedAlbumsIds);
  }

  async getArtistData(name: string, id: string): Promise<any> {
    return await fetch(`${environment.musicServiceApi}/artists/${this.playerService.musicKit.storefrontId}/${name}/${id}`)
      .then(res => res.json());
  }

  async getAlbumData(name: string, id: string): Promise<any> {
    return await fetch(`${environment.musicServiceApi}/albums/${this.playerService.musicKit.storefrontId}/${name}/${id}`)
      .then(res => res.json());
  }

  async getArtistArtwork(url: any): Promise<string> {
    url = url.split('/');
    const id = url[url.length - 1];
    const name = url[url.length - 2];
    const storefront = url[url.length - 4];

    const info = await fetch(`${environment.musicServiceApi}/artists/image/${storefront}/${name}/${id}`)
      .then(res => res.json());

    return info.imageUrl;
  }

  async getGeniusSong(artistName: string, trackName: string, includeLyrics: boolean): Promise<[any, any]> {
    let geniusSong: any, lyrics: any;

    let query = `${artistName} | ${trackName}`;
    query = encodeURIComponent(query);

    const response =  await fetch(`${environment.musicServiceApi}/genius/song/${query}`).then(res => res.json());
    geniusSong = response.response.song;

    if (includeLyrics && geniusSong) {
      lyrics = await fetch(`${environment.musicServiceApi}/genius/lyrics/${geniusSong.id}`).then(res => res.json());
    }

    return [geniusSong, lyrics];
  }

}
