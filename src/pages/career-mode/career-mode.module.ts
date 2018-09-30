import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';
import { CareerModePage } from './career-mode';

@NgModule({
  declarations: [
    CareerModePage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(CareerModePage),
  ],
})
export class CareerModePageModule { }
