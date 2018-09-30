import { VocabularyModePage } from './../vocabulary-mode/vocabulary-mode';
import { UtilsProvider } from './../../providers/utils/utils';
import { ChooseExamLevelPage } from './../choose-exam-level/choose-exam-level';
import { CareerModePage } from './../career-mode/career-mode';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private util: UtilsProvider) {

  }

  ionViewWillEnter() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop({ animate: false });
    }
  }

  goToDesiredLevel($event) {

    if (this.util.NETWORK_AVAILABLE) {
      switch ($event) {

        case 'exam':
          this.navCtrl.push(ChooseExamLevelPage, {}, { animate: false });
          break;

        case 'career':
          this.navCtrl.push(CareerModePage, {}, { animate: false });
          break;

        case 'vocabulary':
          this.navCtrl.push(VocabularyModePage, {}, { animate: false });
          break;

        default:
          break;
      }
    }

  }

}
