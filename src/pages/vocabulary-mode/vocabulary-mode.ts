import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextSpeakProvider } from './../../providers/text-speak/text-speak';

@IonicPage()
@Component({
  selector: 'page-vocabulary-mode',
  templateUrl: 'vocabulary-mode.html',
})
export class VocabularyModePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private speaker: TextSpeakProvider
  ) {
  }

  ionViewWillEnter() {
  }

  public talkText = (text) => {
    this.speaker.talk(text);
  }

}
