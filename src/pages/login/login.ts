import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, Slides, Keyboard } from 'ionic-angular';
import { HomePage } from '../home/home';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';

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

  public loginForm: { name?: string, email?: string, password?: string };
  public backgroundImage = 'assets/img/background/background-6.jpg';

  private slideAnimationDuration: number = 250;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public keyboard: Keyboard,
    private auth: AuthProvider
  ) {
    this.loginForm = {};
  }

  // private required = (name?) => { throw new Error(`O parâmetro ${name || ''} é obrigatório.`) };

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


  public login = async () => {
    await this.auth._signin(
      this.loginForm.email,
      this.loginForm.password);

    // timer(4000).subscribe(() => {
    //   this.auth.signout();
    // });
  }



  public signup = async () => {
    await this.auth._signup(
      this.loginForm.email,
      this.loginForm.password,
      this.loginForm.name);
  }


  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }

}
