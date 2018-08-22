import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(SigninPage),
  ],
})
export class SigninPageModule { }
