import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseExamPage } from './choose-exam';

@NgModule({
  declarations: [
    ChooseExamPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseExamPage),
  ],
})
export class ChooseExamPageModule {}
