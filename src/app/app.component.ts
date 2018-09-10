import { ShareResultsPage } from './../pages/share-results/share-results';
import { of } from 'rxjs/observable/of';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = of(null);

  showSplashScreen: boolean = true;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AuthProvider
  ) {

    // Checa se o usuário fez login
    this.auth.afAuth.authState
      .subscribe((auth) => {
        // Se o objeto 'auth' for válido navega para a home, caso contrário navega para o login
        (auth) ? this.nav.setRoot(HomePage, {}, { animate: false }) : this.nav.setRoot(LoginPage, {}, { animate: false });
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

