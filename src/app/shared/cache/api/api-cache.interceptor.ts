import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiCache } from './api-cache.service';
import { Endpoints } from './api-cache.service';

declare var MusicKit: any;

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {

  storefront: string;

  constructor(private cache: ApiCache) {
    const musicKit = MusicKit.getInstance();
    this.storefront = musicKit.storefrontId;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let endpoint: Endpoints;

    if (req.url.indexOf(`${this.storefront}/artists`) > -1) {
      endpoint = Endpoints.Artists;
    } else if (req.url.indexOf(`${this.storefront}/albums`) > -1) {
      endpoint = Endpoints.Albums;
    } else if (req.url.indexOf(`${this.storefront}/playlists`) > -1) {
      endpoint = Endpoints.Playlists;
    } else if (req.url.indexOf(`${this.storefront}/songs`) > -1) {
      endpoint = Endpoints.Songs;
    } else if (req.url.indexOf(`recommendation`) > -1 || req.url.indexOf(`recent`) > -1 || req.url.indexOf(`history`) > -1) {
      endpoint = Endpoints.Recommendations;
    } else if (req.url.indexOf('curator') > -1 || req.url.indexOf('chart') > -1) {
      endpoint = Endpoints.CuratorCharts;
    } else if (req.url.indexOf(`library/songs`) > -1) {
      endpoint = Endpoints.LibrarySongs;
    } else if (req.url.indexOf(`library`) > -1) {
      endpoint = Endpoints.Library;
    } else if (req.url.indexOf(`artist`) > -1 || req.url.indexOf(`album`) > -1 || req.url.indexOf(`genius`) > -1) {
      endpoint = Endpoints.MusicService;
    }

    const cachedResponse = this.cache.get(req, endpoint);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache, endpoint);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: ApiCache, endpoint: Endpoints): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {

          cache.put(req, event, endpoint);
        }
      })
    );
  }

}
