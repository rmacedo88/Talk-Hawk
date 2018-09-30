import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, Navbar, NavController, NavParams, ToastController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';
import { AuthProvider } from '../../providers/auth/auth';
import { TalkHawkApiProvider } from '../../providers/talk-hawk-api/talk-hawk-api';
import { UtilsProvider } from './../../providers/utils/utils';
import { VoiceRecognitionProvider } from './../../providers/voice-recognition/voice-recognition';


@IonicPage()
@Component({
  selector: 'page-career-mode',
  templateUrl: 'career-mode.html',
})
export class CareerModePage {

  @ViewChild(Navbar) navBar: Navbar;

  // change: boolean = true;
  titleAnswer: string = '';
  leftResponse: string = 'first-answer-animation-enter';
  rightResponse: string = 'second-answer-animation-enter';

  micActive: string = null;

  hasPermission: boolean = false;

  private _questionsRawData;
  totalQuestions: number = 0;
  currentQuestion: number = 1;
  currentQuestionObject: any;


  private _responses: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private voiceRecognition: VoiceRecognitionProvider,
    private util: UtilsProvider,
    private talkHawkApi: TalkHawkApiProvider,
    private alert: AlertController,
    private auth: AuthProvider,
    private toast: ToastController
  ) {
    this.voiceRecognition.requestPermission();

    this._responses = {
      left: 0,
      right: 0
    };
  }

  async ionViewWillEnter() {

    // Mostra um alerta ao pressionar o botão voltar
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.alert.create({
        title: 'Cuidado!',
        message: 'Seu progresso será perdido, tem certeza que deseja sair?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.navCtrl.pop({
              animate: false
            });
          }
        }
        ]
      }).present();
    }

    this._questionsRawData = await this.talkHawkApi.get(`/career/answer/list`);
    this.totalQuestions = (this._questionsRawData.length);

    this.updateQuestion();

  }


  async updateQuestion() {

    this.toast.create({
      message: `${this.currentQuestion} :: ${this.totalQuestions + 1}`,
      duration: 1000,
      position: 'top'
    }).present();

    if (this.currentQuestion === (this.totalQuestions + 1)) {

      this.toast.create({
        message: `ENTROU NO IF`,
        duration: 1000,
        position: 'top'
      }).present();

      // [Envia a resposta para avaliação]
      const responseFeedback = await this.talkHawkApi
        .post(`/career/questions/response`, {
          responses: this._responses,
          userUID: this.auth.user.uid
        });

      this.alert.create({
        title: responseFeedback.title,
        message: responseFeedback.description,
        buttons: [{
          text: 'Sim',
          handler: () => {
            this.navCtrl.pop({
              animate: false
            });
          }
        }]
      }).present();

    } else {
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
    }, 800);
  }


  openMic(event) {
    // [Checa se o aparelho possui uma conexão com a internet]
    if (this.util.NETWORK_AVAILABLE) {

      // [Ativa a animação do microfone]
      this.micActive = 'outline';

      // [Ativa o microfone e recupera o texto transcrito]
      this.voiceRecognition.listen()
        .subscribe(
          (matches: Array<string>) => {

            // [Determina se a frase ou palavra dita pelo usuário coincide com a palavra esperada]
            let __matchResult: boolean = false;

            // [Checa se o usuário escolheu a resposta da esquerda]
            if (matches[0].indexOf(this.currentQuestionObject.leftSide) > -1) {

              // Marca a resposta da esquerda como opção selecionada
              this.leftResponse = 'option-selected';
              __matchResult = true;

              this._responses.left++;

              // [Checa se o usuário escolheu a resposta da direita]
            } else if (matches[0].indexOf(this.currentQuestionObject.rightSide) > -1) {

              // Marca a resposta da direita como opção selecionada
              this.rightResponse = 'option-selected';
              __matchResult = true;

              this._responses.right++;

            } else {
              // [Aplicativo não entendeu ou não esperava essa resposta]
              this.util.error('Não entendi. Por favor fale novamente.');
            }

            // [Desativa a animação do microfone]
            this.micActive = '';


            /**
             * Se a resposta do usuário coincidir com alguma das opções
             * O sistema aguarda 1 segundo e avança para a próxima questão
             */
            if (__matchResult) {
              timer(800).toPromise()
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
