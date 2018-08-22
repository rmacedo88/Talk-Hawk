import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CtaComponent } from './cta/cta';
import { ExamQuestionComponent } from './exam-question/exam-question';

const COMPONENTS = [
  CtaComponent,
  ExamQuestionComponent
]

@NgModule({
  declarations: [COMPONENTS],
  entryComponents: [COMPONENTS],
  imports: [IonicModule],
  exports: [COMPONENTS]
})
export class ComponentsModule { }
