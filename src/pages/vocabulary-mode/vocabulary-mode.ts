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

    this.firstVocabularyItem = await this.talkHawkApi.post('/vocabulary');

    this.secondVocabularyItem = await this.talkHawkApi.post('/vocabulary', { vocabularyItemName: this.firstVocabularyItem.text });

    this.thirdVocabularyItem = await this.talkHawkApi.post('/vocabulary', { vocabularyItemName: this.secondVocabularyItem.text });

    // [Chama a api ]
    this.talkHawkApi.post('/vocabulary')
      .then(first => {

        this.firstVocabularyItem = first;

        // [Chama a api pela segunda vez, enviando ]
        this.talkHawkApi.post('/vocabulary', {
          vocabularyItemName: this.firstVocabularyItem.text
        }).then(second => {

          this.secondVocabularyItem = second;

          // []
          this.talkHawkApi.post('/vocabulary', {
            vocabularyItemName: this.secondVocabularyItem.text
          }).then(third => {

            this.thirdVocabularyItem = third;

            this.lastVocabularyItem = this.thirdVocabularyItem.text;

          });

        });
      });

  }

  /**
   *
   */
  public talkText = async (text, vocabularyItemPosition: string) => {
    this.speaker.talk(text);

    // [timer é um Observable similar ao método setTimeout do javascript]
    timer(800)
      .toPromise() // [Convertendo em uma promise]
      .then(async () => { // [É necessário declarar que a resolução da promise é asincrona para tratar as requisições http sincronas, como se fossem asincronas]


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


  }

}
