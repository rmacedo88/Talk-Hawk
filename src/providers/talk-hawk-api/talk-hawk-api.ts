import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { environment } from '../../app/environment/environment';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class TalkHawkApiProvider {

  constructor(
    public http: HttpClient,
    private loadingController: LoadingController
  ) {
  }

  private _loader: Loading;

  private showLoader() {
    this._loader = this.loadingController.create({
      spinner: "hide",
      content: `
          <div class="custom-spinner-container">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
          </div>`
    });
    this._loader.present();
  }

  private hideLoader() {
    this._loader.dismiss();
  }

  async get(endpoint: string): Promise<any> {
    this.showLoader();
    return await of([''])
      .pipe(
        map(() => `${environment.API_URL}${endpoint}`),
        switchMap(url => this.http.get(url)),
        map(response => {
          this.hideLoader();
          return response;
        })
      )
      .toPromise();
  }

  async put(endpoint: string, body?: any): Promise<any> {
    return await of([''])
      .pipe(
        map(() => `${environment.API_URL}${endpoint}`),
        switchMap(url => this.http.put(url, body || null))
      )
      .toPromise();
  }

  async post(endpoint: string, body?: any): Promise<any> {
    this.showLoader();
    return await of([''])
      .pipe(
        map(() => `${environment.API_URL}${endpoint}`),
        switchMap(url => this.http.post(url, body || null)),
        map(response => {
          this.hideLoader();
          return response;
        })
      )
      .toPromise();
  }

}
