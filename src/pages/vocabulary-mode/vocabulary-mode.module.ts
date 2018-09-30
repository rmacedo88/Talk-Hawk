import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VocabularyModePage } from './vocabulary-mode';

@NgModule({
  declarations: [
    VocabularyModePage,
  ],
  imports: [
    IonicPageModule.forChild(VocabularyModePage),
  ],
})
export class VocabularyModePageModule {}
