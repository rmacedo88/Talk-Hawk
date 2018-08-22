import { ChooseExamLevelPage } from './../choose-exam-level/choose-exam-level';
import { TalkHawkApiProvider } from './../../providers/talk-hawk-api/talk-hawk-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-exam-mode',
  templateUrl: 'exam-mode.html',
})
export class ExamModePage {

  examLevel: string;

  private _questionsRawData;

  currentQuestionObject: any;
  //  {
  //   title: string,
  //   options: [
  //     { iconName: 'a', label: null, uid: null },
  //     { iconName: 'b', label: null, uid: null },
  //     { iconName: 'c', label: null, uid: null },
  //     { iconName: 'd', label: null, uid: null }
  //   ]
  // }

  // questionTitle;

  currentQuestion: number = 1;
  totalQuestions: number = 0;

  // actions: Array<any> = [
  //   { iconName: 'a', label: null },
  //   { iconName: 'b', label: null },
  //   { iconName: 'c', label: null },
  //   { iconName: 'd', label: null }
  // ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private talkHawkApi: TalkHawkApiProvider
  ) {
    this.examLevel = this.navParams.get('level');
  }

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

  createQuestion() {

    this.currentQuestionObject = {
      title: null,
      options: [
        { iconName: 'a', label: null, uid: null },
        { iconName: 'b', label: null, uid: null },
        { iconName: 'c', label: null, uid: null },
        { iconName: 'd', label: null, uid: null }
      ]
    };

    this.currentQuestionObject.title = this._questionsRawData[this.currentQuestion - 1].text;
    // [Recupera o enunciado da próxima pergunta]
    // this.questionTitle = this._questionsRawData[this.currentQuestion - 1].text;
    // [Recupera as opções de resposta junto ao id da questão]
    this.currentQuestionObject.options.forEach((item, index) => {
      item.label = this._questionsRawData[this.currentQuestion - 1].options[index];
      item.uid = this._questionsRawData[this.currentQuestion - 1].uid;
    });
    // this.actions.forEach((item, index) => {
    //   item.label = this._questionsRawData[this.currentQuestion - 1].options[index];
    //   item.uid = this._questionsRawData[this.currentQuestion - 1].uid;
    // });

    console.log(this.currentQuestionObject);
  }

  goToNextQuestion() {
    this.currentQuestion++;
    this.createQuestion();
  }

  async questionResponse(responseOption: string, id: string) {

    if (this.currentQuestion === this.totalQuestions) {
      this.navCtrl.setRoot(ChooseExamLevelPage);
    } else {
      this.goToNextQuestion();
    }

    // [Envia a resposta para avaliação]
    // const responseFeedback = await this.talkHawkApi
    //   .post(`/questions/response/${this.navParams.get('level')}`,
    //     {
    //       questionUID: id,
    //       response: responseOption
    //     });

    // console.log('Avaliação da resposta da questão', responseFeedback);


  }

}
