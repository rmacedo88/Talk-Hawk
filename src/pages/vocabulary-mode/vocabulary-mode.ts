import { timer } from 'rxjs/observable/timer';
import { TalkHawkApiProvider } from './../../providers/talk-hawk-api/talk-hawk-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextSpeakProvider } from './../../providers/text-speak/text-speak';

@IonicPage()
@Component({
  selector: 'page-vocabulary-mode',
  templateUrl: 'vocabulary-mode.html',
})
export class VocabularyModePage {

  test: any;

  lastVocabularyItem: string;

  firstVocabularyItem: any;
  secondVocabularyItem: any;
  thirdVocabularyItem: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private speaker: TextSpeakProvider,
    private talkHawkApi: TalkHawkApiProvider
  ) {

  }

  async ionViewWillEnter() {
    // this.test = await this.talkHawkApi.post('/vocabulary');

    this.talkHawkApi.post('/vocabulary')
      .then(first => {

        this.firstVocabularyItem = first;

        this.talkHawkApi.post('/vocabulary', {
          vocabularyItemName: this.firstVocabularyItem.text
        }).then(second => {

          this.secondVocabularyItem = second;

          this.talkHawkApi.post('/vocabulary', {
            vocabularyItemName: this.secondVocabularyItem.text
          }).then(third => {

            this.thirdVocabularyItem = third;

            this.lastVocabularyItem = this.thirdVocabularyItem.text;

          });

        });
      });

    console.log(this.firstVocabularyItem, this.secondVocabularyItem, this.thirdVocabularyItem);
  }

  public talkText = async (text, vocabularyItemPosition: string) => {
    this.speaker.talk(text);

    timer(800)
      .toPromise()
      .then(async () => {

        switch (vocabularyItemPosition) {
          case 'first':

            this.firstVocabularyItem = await this.talkHawkApi.post('/vocabulary', {
              vocabularyItemName: this.lastVocabularyItem
            });

            this.lastVocabularyItem = (this.firstVocabularyItem) ? this.firstVocabularyItem.text : this.lastVocabularyItem;

            break;

          case 'second':

            this.secondVocabularyItem = await this.talkHawkApi.post('/vocabulary', {
              vocabularyItemName: this.lastVocabularyItem
            });

            this.lastVocabularyItem = (this.secondVocabularyItem) ? this.secondVocabularyItem.text : this.lastVocabularyItem;

            break;

          case 'third':

            this.thirdVocabularyItem = await this.talkHawkApi.post('/vocabulary', {
              vocabularyItemName: this.lastVocabularyItem
            });

            this.lastVocabularyItem = (this.thirdVocabularyItem) ? this.thirdVocabularyItem.text : this.lastVocabularyItem;

            break;

          default:
            break;
        }

      });



    // console.log(this.test);

  }

}
