import { concat } from 'rxjs/operators/concat';
import { merge } from 'rxjs/operators/merge';
import { interval } from 'rxjs/observable/interval';
import { switchMap } from 'rxjs/operators/switchMap';
import { timer } from 'rxjs/observable/timer';
import { ChooseExamLevelPage } from './../choose-exam-level/choose-exam-level';
import { CareerModePage } from './../career-mode/career-mode';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { take } from 'rxjs/operators/take';
import { map } from 'rxjs/operators/map';

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

  @ViewChild(Navbar) navBar: Navbar;

  actions: Array<any> = [
    { iconName: 'exam', label: 'Modo Exame' },
    { iconName: 'career', label: 'Modo Carreira' },
    { iconName: 'vocabulary', label: 'Vocabulário' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop({ animate: false });
    }
  }

  ionViewDidEnter() {

  }

  goToDesiredLevel($event) {
    switch ($event) {

      case 'exam':
        this.navCtrl.push(ChooseExamLevelPage, {}, { animate: false });
        break;

      case 'career':
        this.navCtrl.push(CareerModePage, {}, { animate: false });
        break;

      case 'vocabulary':
        this.navCtrl.push(CareerModePage, {}, { animate: false });
        break;

      default:
        break;
    }
  }

  // goToChooseExam() {
  //   this.navCtrl.push(ChooseExamLevelPage, {}, { animate: false });
  // }

  // goToCareerMode() {
  //   this.navCtrl.push(CareerModePage, {}, { animate: false });
  // }

}
