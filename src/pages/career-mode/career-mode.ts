import { UtilsProvider } from './../../providers/utils/utils';
import { VoiceRecognitionProvider } from './../../providers/voice-recognition/voice-recognition';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { TalkHawkApiProvider } from '../../providers/talk-hawk-api/talk-hawk-api';
import { timer } from 'rxjs/observable/timer';

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

  micActive: string = null;

  hasPermission: boolean = false;

  private _questionsRawData;
  totalQuestions: number = 0;
  currentQuestion: number = 1;
  currentQuestionObject: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private voiceRecognition: VoiceRecognitionProvider,
    private util: UtilsProvider,
    private talkHawkApi: TalkHawkApiProvider,
    private alert: AlertController
  ) {
    this.voiceRecognition.requestPermission();
  }

  async ionViewDidLoad() {

    // Mostra um alerta ao preccionar o botão voltar
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.alert.create({
        title: 'Cuidado!',
        message: 'Seu progresso será perdido, tem certeza que deseja sair?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Sim',
            handler: () => {
              this.navCtrl.pop({ animate: false });
            }
          }
        ]
      }).present();
    }

    this._questionsRawData = await this.talkHawkApi.get(`/career/answer/list`);
    this.totalQuestions = (this._questionsRawData.length);

    this.updateQuestion();

  }


  updateQuestion() {
    if (this.currentQuestion === (this.totalQuestions + 1)) {
      this.navCtrl.pop({ animate: false });
    } {
      this.currentQuestionObject = this._questionsRawData[this.currentQuestion - 1];
      this.currentQuestion++;
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
    }, 100);
  }


  openMic(event) {
    if (this.util.NETWORK_AVAILABLE) {

      this.micActive = 'outline';
      this.voiceRecognition.listen()
        .subscribe(
          (matches: Array<string>) => {

            let matchResult: boolean = false;

            if (matches[0].indexOf(this.currentQuestionObject.leftSide) > -1) {

              this.leftResponse = 'option-selected';
              matchResult = true;

            } else if (matches[0].indexOf(this.currentQuestionObject.rightSide) > -1) {

              this.rightResponse = 'option-selected';
              matchResult = true;

            } else {
              this.util.error('Não entendi. Por favor fale novamente.');
            }

            this.micActive = '';

            if (matchResult) {
              timer(1000).toPromise()
                .then(() => {
                  this.updateAnimations();
                  this.updateQuestion();
                });
            }
          },
          () => {
            this.util.error('Não entendi. Por favor fale novamente.');
            this.micActive = '';
          }
        );

    }
  }

}
