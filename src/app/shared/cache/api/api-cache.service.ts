import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

declare var MusicKit: any;

export enum Endpoints {
  Artists = 1,
  Albums = 2,
  Playlists = 3,
  Songs = 4,
  Recommendations = 5,
  CuratorCharts = 6,
  Library = 7,
  LibrarySongs = 8,
  MusicService = 9,
}

@Injectable()
export class ApiCache  {

  storefront: string;

  artistCache = new Map();
  albumCache = new Map();
  playlistCache = new Map();
  songCache = new Map();
  recommendationCache = new Map();
  curatorChartCache = new Map();
  libraryCache = new Map();
  librarySongCache = new Map();
  musicServiceCache = new Map();

  constructor() {
    const musicKit = MusicKit.getInstance();
    this.storefront = musicKit.storefrontId;

    setInterval(() => {
      this.artistCache = new Map();
      this.albumCache = new Map();
      this.playlistCache = new Map();
      this.songCache = new Map();
      this.recommendationCache = new Map();
      this.curatorChartCache = new Map();
      this.libraryCache = new Map();
      this.librarySongCache = new Map();
      this.musicServiceCache = new Map();
    }, 1000 * 60 * 60 * 20);
  }

  get(req: HttpRequest<any>, endpoint: Endpoints): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    let cached: any;

    switch (endpoint) {
      case Endpoints.Artists:
        cached = this.artistCache.get(url);
        break;
      case Endpoints.Albums:
        cached = this.albumCache.get(url);
        break;
      case Endpoints.Playlists:
        cached = this.playlistCache.get(url);
        break;
      case Endpoints.Songs:
        cached = this.songCache.get(url);
        break;
      case Endpoints.Recommendations:
        cached = this.recommendationCache.get(url);
        break;
      case Endpoints.CuratorCharts:
        cached = this.curatorChartCache.get(url);
        break;
      case Endpoints.Library:
        cached = this.libraryCache.get(url);
        break;
      case Endpoints.LibrarySongs:
        cached = this.librarySongCache.get(url);
        break;
      case Endpoints.MusicService:
        cached = this.musicServiceCache.get(url);
        break;
    }

    if (!cached) {
      return undefined;
    }

    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>, endpoint: Endpoints): void {
    const url = req.urlWithParams;
    const entry = { url, response, lastRead: Date.now() };

    switch (endpoint) {
      case Endpoints.Artists:
        this.artistCache.set(url, entry);
        break;
      case Endpoints.Albums:
        this.albumCache.set(url, entry);
        break;
      case Endpoints.Playlists:
        this.playlistCache.set(url, entry);
        break;
      case Endpoints.Songs:
        this.songCache.set(url, entry);
        break;
      case Endpoints.Recommendations:
        this.recommendationCache.set(url, entry);
        break;
      case Endpoints.CuratorCharts:
        this.curatorChartCache.set(url, entry);
        break;
      case Endpoints.Library:
        this.libraryCache.set(url, entry);
        break;
      case Endpoints.LibrarySongs:
        this.librarySongCache.set(url, entry);
        break;
      case Endpoints.MusicService:
        this.musicServiceCache.set(url, entry);
        break;
    }

    /* const expired = Date.now() - 600000;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    }); */
  }

}
