import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiCache } from './api-cache.service';
import { Endpoints } from './api-cache.service';

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {

  constructor(private cache: ApiCache) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let endpoint: Endpoints;

    if (req.url.indexOf(`/artists`) > -1) {
      endpoint = 'Artists';
    } else if (req.url.indexOf(`/albums`) > -1) {
      endpoint = 'Albums';
    } else if (req.url.indexOf(`/playlists`) > -1) {
      endpoint = 'Playlists';
    } else if (req.url.indexOf(`/songs`) > -1) {
      endpoint = 'Songs';
    } else if (req.url.indexOf(`recommendation`) > -1 || req.url.indexOf(`recent`) > -1 || req.url.indexOf(`history`) > -1) {
      endpoint = 'Recommendations';
    } else if (req.url.indexOf('curator') > -1 || req.url.indexOf('chart') > -1) {
      endpoint = 'CuratorCharts';
    } else if (req.url.indexOf(`library/songs`) > -1) {
      endpoint = 'LibrarySongs';
    } else if (req.url.indexOf(`library`) > -1) {
      endpoint = 'Library';
    } else if (req.url.indexOf(`artist`) > -1 || req.url.indexOf(`album`) > -1 || req.url.indexOf(`genius`) > -1) {
      endpoint = 'ValenceApi';
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
