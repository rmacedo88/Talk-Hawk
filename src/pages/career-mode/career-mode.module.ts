import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareerModePage } from './career-mode';

@NgModule({
  declarations: [
    CareerModePage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(CareerModePage),
  ],
})
export class CareerModePageModule { }
