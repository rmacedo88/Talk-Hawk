import { UtilsProvider } from './../utils/utils';
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
    private loadingController: LoadingController,
    private util: UtilsProvider
  ) {
  }

  private _LOADER: Loading;

  private showLoader = () => {
    this._LOADER = this.loadingController
      .create({
        spinner: "hide",
        content: `
          <div class="custom-spinner-container">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
          </div>`
      });
    this._LOADER.present();
  }

  private hideLoader = () => {
    this._LOADER.dismiss();
  }


  public get = async (endpoint: string): Promise<any> => {
    if (this.util.NETWORK_AVAILABLE) {
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
        .toPromise()
        .then(obj => { return obj })
        .catch(() => { this.hideLoader(); });
    }
    else {
      return false;
    }
  }


  public put = async (endpoint: string, body?: any): Promise<any> => {
    if (this.util.NETWORK_AVAILABLE) {
      this.showLoader();
      return await of([''])
        .pipe(
          map(() => `${environment.API_URL}${endpoint}`),
          switchMap(url => this.http.put(url, body || null)),
          map(response => {
            this.hideLoader();
            return response;
          })
        )
        .toPromise()
        .then(obj => { return obj })
        .catch(() => { this.hideLoader(); });
    }
    else {
      return false;
    }
  }


  public post = async (endpoint: string, body?: any): Promise<any> => {
    if (this.util.NETWORK_AVAILABLE) {
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
        .toPromise()
        .then(obj => { return obj })
        .catch(() => { this.hideLoader(); });
    }
    else {
      return false;
    }
  }

}
