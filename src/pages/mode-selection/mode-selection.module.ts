import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeSelectionPage } from './mode-selection';

@NgModule({
  declarations: [
    ModeSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeSelectionPage),
  ],
})
export class ModeSelectionPageModule {}
