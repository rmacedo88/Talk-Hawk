import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamModePage } from './exam-mode';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ExamModePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ExamModePage),
  ],
})
export class ExamModePageModule { }
