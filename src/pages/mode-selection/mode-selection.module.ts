import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeSelectionPage } from './mode-selection';

@NgModule({
  declarations: [
    ModeSelectionPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(ModeSelectionPage),
  ],
})
export class ModeSelectionPageModule { }
