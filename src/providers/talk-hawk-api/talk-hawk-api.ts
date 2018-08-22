import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { environment } from '../../app/environment/environment';

@Injectable()
export class TalkHawkApiProvider {

  constructor(public http: HttpClient) {
  }

  async get(endpoint: string, params?: Array<any>): Promise<any> {
    return await of([''])
      .pipe(
        map(() => `${environment.API_URL}${endpoint}`),
        switchMap(url => this.http.get(url))
      )
      .toPromise();
  }

  async put(endpoint: string, params?: any): Promise<any> {
    return await of([''])
      .pipe(
        map(() => `${environment.API_URL}${endpoint}`),
        switchMap(url => this.http.put(url, params || null))
      )
      .toPromise();
  }

  async post(endpoint: string, params?: any): Promise<any> {
    return await of([''])
      .pipe(
        map(() => `${environment.API_URL}${endpoint}`),
        switchMap(url => this.http.post(url, params || null))
      )
      .toPromise();
  }

}
