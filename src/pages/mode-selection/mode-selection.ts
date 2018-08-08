import { CareerModePage } from './../career-mode/career-mode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseExamPage } from '../choose-exam/choose-exam';

/**
 * Generated class for the ModeSelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-selection',
  templateUrl: 'mode-selection.html',
})
export class ModeSelectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModeSelectionPage');
  }

  goToChooseExam() {
    this.navCtrl.push(ChooseExamPage);
  }

  goToCareerMode() {
    this.navCtrl.push(CareerModePage);
  }

}
