import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { of } from 'rxjs/observable/of';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';


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
    private auth: AuthProvider,
  ) {

    // Checa se o usuário fez login
    this.auth.afAuth.authState
      .subscribe((auth) => {
        // Se o objeto 'auth' for válido navega para a home, caso contrário navega para o login
        (auth) ? this.nav.setRoot(HomePage, {}, { animate: false }) : this.nav.setRoot(LoginPage, {}, { animate: false });
      });

    platform.ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
  }
}

