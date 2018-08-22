import { ExamModePageModule } from './../pages/exam-mode/exam-mode.module';
import { ChooseExamLevelPageModule } from './../pages/choose-exam-level/choose-exam-level.module';
import { AsyncImgLoaderDirective } from './../directives/async-img-loader/async-img-loader';
import { CareerModePageModule } from './../pages/career-mode/career-mode.module';
import { ModeSelectionPageModule } from './../pages/mode-selection/mode-selection.module';
import { HttpTokenInterceptor } from './../shared/interceptor/http-token.interceptor';
import { SigninPageModule } from './../pages/signin/signin.module';
import { SignupPageModule } from './../pages/signup/signup.module';
import { PasswordResetPageModule } from './../pages/password-reset/password-reset.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { Nav, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthProvider } from '../providers/auth/auth';
import { DirectivesModule } from '../directives/directives.module';
import { LoginPageModule } from '../pages/login/login.module';
import { TalkHawkApiProvider } from '../providers/talk-hawk-api/talk-hawk-api';


export const MODULES = [
  BrowserModule,
  HttpClientModule,

  LoginPageModule,
  SigninPageModule,
  SignupPageModule,
  PasswordResetPageModule,
  ModeSelectionPageModule,
  ChooseExamLevelPageModule,
  CareerModePageModule,
  ExamModePageModule,

  DirectivesModule
];

export const PROVIDERS = [

  // IONIC PROVIDERS
  StatusBar,
  SplashScreen,
  Nav,
  Keyboard,

  // FIRESTORE AUTH PROVIDER
  AngularFireAuth,

  // CUSTOM PROVIDERS
  AuthProvider,
  TalkHawkApiProvider,

  // SERVICE WORKERS

  // INTERCEPTORS
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }

];

export const DIRECTIVES = [
  // AsyncImgLoaderDirective
];
