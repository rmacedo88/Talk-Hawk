import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-career-mode',
  templateUrl: 'career-mode.html',
})
export class CareerModePage {

  @ViewChild(Navbar) navBar: Navbar;

  change: boolean = true;
  titleAnswer: string = '';
  leftResponse: string = 'first-answer-animation-enter';
  rightResponse: string = 'second-answer-animation-enter';

  signinAction: {} = { icon: 'signin', label: 'Fazer Login' };
  signupAction: {} = { icon: 'signup', label: 'Criar Conta' };

  leftColors: Array<any> = [
    { text: 'Blue', code: '#2196f3', side: 'left' },
    { text: 'Green', code: '#4caf50', side: 'left' },
    { text: 'Yellow', code: '#f57f17', side: 'left' },
    { text: 'Grey', code: '#9e9e9e', side: 'left' },
  ];

  rightColors: Array<any> = [
    { text: 'Red', code: '#f44336', side: 'right' },
    { text: 'Purple', code: '#9c27b0', side: 'right' },
    { text: 'Pink', code: '#e91e63', side: 'right' },
    { text: 'Brown', code: '#795548', side: 'right' },
  ];

  animations: Array<any> = [
    'pop-in', 'wave', 'wobble', 'drop-in', 'fadein-down'
  ];

  animation: string = this.animations[0];

  leftColor: {} = this.leftColors[0];
  rightColor: {} = this.rightColors[0];;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop({ animate: false });
    }
  }

  updateAnimations() {
    this.leftResponse = 'first-answer-animation-close';
    this.rightResponse = 'second-answer-animation-close';
    this.titleAnswer = '';

    setTimeout(() => {
      this.leftResponse = 'first-answer-animation-enter';
      this.rightResponse = 'second-answer-animation-enter';
      this.titleAnswer = '';
      console.log('cleaned');
    }, 100);
  }

  openMic() {
    this.updateAnimations();
    console.log('mic opened');
    this.change = (this.change) ? false : true;
    this.leftColor = this.leftColors[Math.floor(Math.random() * this.leftColors.length)];
    this.rightColor = this.rightColors[Math.floor(Math.random() * this.rightColors.length)];
    this.animation = this.animations[Math.floor(Math.random() * this.animations.length)]
  }



}
