import { take } from 'rxjs/operators/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TalkHawkApiProvider } from '../../providers/talk-hawk-api/talk-hawk-api';


@Component({
  selector: 'exam-question',
  templateUrl: 'exam-question.html'
})
export class ExamQuestionComponent {

  private _level: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  @Input()
  set level(value) {
    this._level.next(value);
  }

  get level() {
    return this.level.getValue();
  }

  @Output() userResponses = new EventEmitter();

  questions;

  questionTitle;

  currentQuestion: number = 0;

  actions: Array<any> = [
    { iconName: 'letter-a', label: null },
    { iconName: 'letter-b', label: null },
    { iconName: 'letter-c', label: null },
    { iconName: 'letter-d', label: null }
  ];

  constructor(
    private talkHawkApi: TalkHawkApiProvider
  ) {

    this._level
      .pipe(take(2))
      .subscribe(async level => {
        if (level) {
          this.questions = await this.talkHawkApi.get(`/questions/list/${level}`);
          this.setCurrentQuestion(this.currentQuestion);
        }
      });
  }

  setCurrentQuestion(questionNumber) {
    if (questionNumber < 10) {
      this.questionTitle = this.questions[questionNumber].text.split(' - ')[1];
      this.actions.forEach((item, index) => {
        item.label = this.questions[questionNumber].options[index].split(' - ')[1];
      });
    }
  }

  questionResponse(iconName: string) {
    if (this.currentQuestion < 10) {
      console.log(this.currentQuestion, iconName.split('-')[1]);
      this.setCurrentQuestion(++this.currentQuestion);
    } else {
      console.log('ACABOU?');
    }
  }

}
