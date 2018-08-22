import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, Slides, Keyboard } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  signinAction: {} = { icon: 'signin', label: 'Fazer Login' };
  signupAction: {} = { icon: 'signup', label: 'Criar Conta' };

  public loginForm: any;
  public backgroundImage = 'assets/img/background/background-6.jpg';

  private slideAnimationDuration: number = 250;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public keyboard: Keyboard
  ) {
  }

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  goToSignin() {
    this.slider.slideTo(1, this.slideAnimationDuration);
  }

  goToSignup() {
    this.slider.slideTo(2, this.slideAnimationDuration);
  }

  slideNext() {
    this.innerSlider.slideNext(this.slideAnimationDuration);
  }

  slidePrevious() {
    this.innerSlider.slidePrev(this.slideAnimationDuration);
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

  login() {
    // this.presentLoading('Thanks for signing up!');
    this.navCtrl.setRoot(HomePage);
  }

  signup() {
    // this.presentLoading('Thanks for signing up!');
    this.navCtrl.setRoot(HomePage);
  }
  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }

}
