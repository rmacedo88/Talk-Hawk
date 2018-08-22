import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseExamLevelPage } from './choose-exam-level';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ChooseExamLevelPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(ChooseExamLevelPage),
  ],
})
export class ChooseExamLevelPageModule { }
