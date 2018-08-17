import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule { }
