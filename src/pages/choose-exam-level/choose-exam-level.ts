import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ExamModePage } from '../exam-mode/exam-mode';

@IonicPage()
@Component({
  selector: 'page-choose-exam-level',
  templateUrl: 'choose-exam-level.html',
})
export class ChooseExamLevelPage {

  @ViewChild(Navbar) navBar: Navbar;

  actions: Array<any> = [
    { iconName: 'easy-question', label: 'Principiante' },
    { iconName: 'hard-question', label: 'Mestre Jedi' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewWillEnter() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop({ animate: false });
    }
  }

  goToDesiredLevel($event) {

    // [Recupera o texto 'easy' ou  'hard', fornecido pelo array actions]
    const desiredLevel = $event.split('-')[0];

    this.navCtrl.push(ExamModePage, {
      level: desiredLevel
    });
  }


}
