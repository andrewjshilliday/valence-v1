import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export type Endpoints =
  'Artists' |
  'Albums' |
  'Playlists' |
  'Songs' |
  'Recommendations' |
  'CuratorCharts' |
  'Library' |
  'LibrarySongs' |
  'ValenceApi';

@Injectable()
export class ApiCache  {


  artistCache = new Map();
  albumCache = new Map();
  playlistCache = new Map();
  songCache = new Map();
  recommendationCache = new Map();
  curatorChartCache = new Map();
  libraryCache = new Map();
  librarySongCache = new Map();
  valenceApiCache = new Map();

  constructor() {
    setInterval(() => {
      this.artistCache = new Map();
      this.albumCache = new Map();
      this.playlistCache = new Map();
      this.songCache = new Map();
      this.recommendationCache = new Map();
      this.curatorChartCache = new Map();
      this.libraryCache = new Map();
      this.librarySongCache = new Map();
      this.valenceApiCache = new Map();
    }, 1000 * 60 * 60 * 20);
  }

  get(req: HttpRequest<any>, endpoint: Endpoints): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    let cached: any;

    switch (endpoint) {
      case 'Artists':
        cached = this.artistCache.get(url);
        break;
      case 'Albums':
        cached = this.albumCache.get(url);
        break;
      case 'Playlists':
        cached = this.playlistCache.get(url);
        break;
      case 'Songs':
        cached = this.songCache.get(url);
        break;
      case 'Recommendations':
        cached = this.recommendationCache.get(url);
        break;
      case 'CuratorCharts':
        cached = this.curatorChartCache.get(url);
        break;
      case 'Library':
        cached = this.libraryCache.get(url);
        break;
      case 'LibrarySongs':
        cached = this.librarySongCache.get(url);
        break;
      case 'ValenceApi':
        cached = this.valenceApiCache.get(url);
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
      case 'Artists':
        this.artistCache.set(url, entry);
        break;
      case 'Albums':
        this.albumCache.set(url, entry);
        break;
      case 'Playlists':
        this.playlistCache.set(url, entry);
        break;
      case 'Songs':
        this.songCache.set(url, entry);
        break;
      case 'Recommendations':
        this.recommendationCache.set(url, entry);
        break;
      case 'CuratorCharts':
        this.curatorChartCache.set(url, entry);
        break;
      case 'Library':
        this.libraryCache.set(url, entry);
        break;
      case 'LibrarySongs':
        this.librarySongCache.set(url, entry);
        break;
      case 'ValenceApi':
        this.valenceApiCache.set(url, entry);
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
