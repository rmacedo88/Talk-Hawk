import { CareerModePageModule } from './../pages/career-mode/career-mode.module';
import { ChooseExamPageModule } from './../pages/choose-exam/choose-exam.module';
import { ModeSelectionPageModule } from './../pages/mode-selection/mode-selection.module';
import { HttpTokenInterceptor } from './../shared/interceptor/http-token.interceptor';
import { SigninPageModule } from './../pages/signin/signin.module';
import { SignupPageModule } from './../pages/signup/signup.module';
import { PasswordResetPageModule } from './../pages/password-reset/password-reset.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthProvider } from '../providers/auth/auth';


export const MODULES = [
  BrowserModule,
  HttpClientModule,

  SigninPageModule,
  SignupPageModule,
  PasswordResetPageModule,
  ModeSelectionPageModule,
  ChooseExamPageModule,
  CareerModePageModule
];

export const PROVIDERS = [

  // IONIC PROVIDERS
  StatusBar,
  SplashScreen,
  Nav,

  // FIRESTORE AUTH PROVIDER
  AngularFireAuth,

  // CUSTOM PROVIDERS
  AuthProvider,

  // SERVICE WORKERS

  // INTERCEPTORS
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }

];

export const DIRECTIVES = [

];
