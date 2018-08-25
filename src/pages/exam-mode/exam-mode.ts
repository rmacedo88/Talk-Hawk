import { ShareContentProvider } from './../../providers/share-content/share-content';
import { ChooseExamLevelPage } from './../choose-exam-level/choose-exam-level';
import { TalkHawkApiProvider } from './../../providers/talk-hawk-api/talk-hawk-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

@IonicPage()
@Component({
  selector: 'page-exam-mode',
  templateUrl: 'exam-mode.html',
})
export class ExamModePage {

  // Nível de dificuldade escolhido
  examLevel: string;

  // Pontuação conquistada nessa rodada
  pointsEarned: number = 0;

  // Informações referentes à questões recuperadas do firebase
  private _questionsRawData;

  // Objeto exibido na tela com os dados da questão atual
  currentQuestionObject: any;

  // Índice que determina a próxima questão a ser exibida para o usuário
  currentQuestion: number = 1;

  // Total de questões para essa rodada
  totalQuestions: number = 0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private talkHawkApi: TalkHawkApiProvider,
    private share: ShareContentProvider
  ) {
    // [Recupera a dificuldade escolhida pelo usuário]
    this.examLevel = this.navParams.get('level');
  }


  /**
   * Recupera a lista de questões usando a api talk hawk.
   * Determina o número de questões para essa rodada e carrega os dados da primeira questão na tela.
   */
  async ionViewDidLoad() {
    try {
      // [Invoca a API talk hawk e obtém todas as quest!oes de um determinado nível (Fácil ou Difícil)]
      this._questionsRawData = await this.talkHawkApi.get(`/questions/list/${this.examLevel}`);
      // [Determina o total de questões a serem respondidas]
      this.totalQuestions = (this._questionsRawData.length);
      // [Envia os dados da primeira questão para a tela]
      this.createQuestion();

    } catch (error) {
      console.log(error);
    }
    // this.talkHawkApi.put(`/populateQuestionsCollection`)
    //   .then(test => console.log(test))
    //   .catch(err => console.log(err));
  }


  /**
   * Carrega os dados de uma questão na tela.
   * Esse carregamento respeita o índice 'currentQuestion'
   */
  createQuestion() {

    // [Formato do objeto que representa uma questão]
    this.currentQuestionObject = {
      title: null,
      options: [
        { iconName: 'a', label: null, uid: null },
        { iconName: 'b', label: null, uid: null },
        { iconName: 'c', label: null, uid: null },
        { iconName: 'd', label: null, uid: null }
      ]
    };

    // [Recupera o enunciado da próxima pergunta]
    this.currentQuestionObject.title = this._questionsRawData[this.currentQuestion - 1].text;

    // [Recupera as opções de resposta junto ao id da questão]
    this.currentQuestionObject.options.forEach((item, index) => {
      item.label = this._questionsRawData[this.currentQuestion - 1].options[index];
      item.uid = this._questionsRawData[this.currentQuestion - 1].uid;
    });

  }


  /**
   * Avança o índice em uma posição e carrega a nova questão
   */
  goToNextQuestion() {
    this.currentQuestion++;
    this.createQuestion();
  }


  /**
   * Efetua a avaliação da resposta do usuário a cada questão respondida
   * @param responseOption uma letra entre 'a' e 'd'
   * @param id UID de um determinado documento da collection 'questions'
   */
  async questionResponse(responseOption: string, id: string) {

    // [Envia a resposta para avaliação]
    const responseFeedback = await this.talkHawkApi
      .post(`/questions/response/${this.navParams.get('level')}`,
        {
          questionUID: id,
          response: responseOption
        });

    // [Recupera o feedback e incrementa a pontuação do usuário]
    this.pointsEarned += (responseFeedback.points) ? responseFeedback.points : 0;

    // [Checa se essa resposta se refere à última questão]
    if (this.currentQuestion === this.totalQuestions) {
      // [SERÁ ATUALIZADO: Atualmente envia o usuário de volta para a tela de escolha da dificuldade]
      timer(2000)
        .subscribe(() => {
          this.share.shareContent('facebook', 'teste');
          // this.navCtrl.setRoot(ChooseExamLevelPage);
        });
    } else {
      // [Se essa não é a última resposta, avança para a próxima questão]
      this.goToNextQuestion();
    }

  }

}
