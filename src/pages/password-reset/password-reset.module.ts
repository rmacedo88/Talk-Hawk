import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordResetPage } from './password-reset';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PasswordResetPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(PasswordResetPage),
  ],
})
export class PasswordResetPageModule { }
