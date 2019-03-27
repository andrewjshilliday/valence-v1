import { Injectable } from '@angular/core';
import { MusicPlayerService } from './music-player.service';
import { environment } from '../../../environments/environment';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class MusicApiService {

  constructor(public musicPlayerService: MusicPlayerService) { }

  async getArtist(id: string, artist?: any): Promise<any> {
    if (artist && artist.id === id) {
      return artist;
    }

    const isLibraryResource = id.startsWith('r.');
    artist = null;
    // this.album = null;

    if (isLibraryResource) {
      artist = await this.musicPlayerService.musicKit.api.library.artist(id);
    } else {
      artist = await this.musicPlayerService.musicKit.api.artist(id);
    }

    return artist;
  }

  async getArtistAlbums(id: string, albums?: any): Promise<any> {
    const isLibraryResource = id.startsWith('r.');
    albums = null;

    if (isLibraryResource) {
      albums = await this.musicPlayerService.musicKit.api.library.artist(id, { include: 'albums' });
    } else {
      albums = await this.musicPlayerService.musicKit.api.artist(id, { include: 'albums' });
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
      album = await this.musicPlayerService.musicKit.api.library.album(id, { include: 'artists' });
    } else {
      album = await this.musicPlayerService.musicKit.api.album(id, { include: 'songs' });
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
      playlist = await this.musicPlayerService.musicKit.api.library.playlist(id, { include: 'tracks' });
    } else {
      playlist = await this.musicPlayerService.musicKit.api.playlist(id, { include: 'curators' });
    }

    return playlist;
  }

  async getPlaylists(id: string): Promise<any> {
    let playlists = null;
    const isLibraryResource = id.startsWith('r.');

    if (isLibraryResource) {
      return await this.musicPlayerService.musicKit.api.library.artist(id, { include: 'playlists' });
    } else {
      try {
        playlists = await this.musicPlayerService.musicKit.api.artist(id, { include: 'playlists' });
      } finally {
        return playlists;
      }
    }
  }

  async getRelatedAlbums(album: any) {
    const url = album.attributes.url.split('/');
    const name = url[url.length - 2];

    const info = await fetch(environment.musicServiceApi + 'albums/' +
      `${this.musicPlayerService.musicKit.storefrontId}/${name}/${album.id}`)
      .then(res => res.json());
    info.description = JSON.parse(info.description);

    if (!info.description.data.relationships.listenersAlsoBought) {
      return;
    }

    const relatedAlbumsIds = info.description.data.relationships.listenersAlsoBought.data.map(i => i.id);
    return await this.musicPlayerService.musicKit.api.albums(relatedAlbumsIds);
  }

  appleApiHeaders() {
    return new Headers({
      Authorization: 'Bearer ' + MusicKit.getInstance().developerToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': '' + MusicKit.getInstance().musicUserToken
    });
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

        results = await this.musicPlayerService.musicKit.api.albums(itemIdArray, { include: 'artists' });

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

        results = await this.musicPlayerService.musicKit.api.albums(itemIdArray, { include: 'artists' });

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

        results = await this.musicPlayerService.musicKit.api.playlists(itemIdArray, { include: 'curators' });

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
        results = await this.musicPlayerService.musicKit.api.songs(itemIdArray, { include: 'artists,albums' });

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

  async getRatings(collection: any): Promise<any> {
    let url = 'https://api.music.apple.com/v1/me/ratings/songs?ids=';

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
      fetch(`https://api.music.apple.com/v1/me/ratings/songs/${item.id}`, {
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
      fetch(`https://api.music.apple.com/v1/me/ratings/songs/${item.id}`, {
        method: 'DELETE',
        headers: this.appleApiHeaders(),
      });
    }
  }

  async addToLibrary(item: any) {
    await this.musicPlayerService.musicKit.api.addToLibrary({ [item.type]: [item.id] });
    alert('Successfully added ' + item.attributes.name + ' to your library');
  }

  async getArtistArtwork(url: any): Promise<string> {
    url = url.split('/');
    const id = url[url.length - 1];
    const name = url[url.length - 2];
    const storefront = url[url.length - 4];

    const info = await fetch(environment.musicServiceApi + `artists/image/${storefront}/${name}/${id}`)
      .then(res => res.json());

    return info.imageUrl;
  }

}
