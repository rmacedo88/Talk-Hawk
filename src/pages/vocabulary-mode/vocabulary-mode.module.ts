import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VocabularyModePage } from './vocabulary-mode';

@NgModule({
  declarations: [
    VocabularyModePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(VocabularyModePage),
  ],
})
export class VocabularyModePageModule { }
