import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class StartupService {

    constructor(private http: HttpClient) { }

    async load(): Promise<any> {
      await fetch('https://ut8obu95ge.execute-api.eu-west-1.amazonaws.com/dev/auth?service=apple-music')
        .then(response => response.json())
        .then​(body => {
          environment.appleMusicDevToken = body.access_token;
        });

      return Promise.resolve(environment.appleMusicDevToken);
    }

}
