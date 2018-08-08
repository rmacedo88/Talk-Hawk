import { SignupPage } from './../signup/signup';
import { map } from 'rxjs/operators/map';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
import { PasswordResetPage } from '../password-reset/password-reset';
import { HomePage } from '../home/home';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public backgroundImage: 'https://images.unsplash.com/photo-1475463606759-53a070b44126?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=40fde1f7480e45874560c2d8e577477c&auto=format&fit=crop&w=3161&q=80';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingControllerProvider: LoadingController,
    private alertControllerProvider: AlertController,
    private app: App,
    private httpClientProvider: HttpClient
  ) {
    // this.navCtrl.pop({ animate: false });
  }

  login() {

    of(['hard']).pipe(
      map(v => `https://us-central1-tawk-hawk-dev.cloudfunctions.net/talkhawk/questions/list/${v}`),
      switchMap(url => this.httpClientProvider.get(url)),
    ).toPromise()
      .then(result => { console.log(result) })
      .catch(err => { console.error(err) });

    this.navCtrl.setRoot(HomePage, {}, { animate: false });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  gotToSignup() {
    this.navCtrl.push(SignupPage, {}, { animate: false });
  }

  goToPasswordReset() {
    this.navCtrl.push(PasswordResetPage, {}, { animate: false });
  }

}
