import { ShareContentProvider } from './../providers/share-content/share-content';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ExamModePageModule } from './../pages/exam-mode/exam-mode.module';
import { ChooseExamLevelPageModule } from './../pages/choose-exam-level/choose-exam-level.module';
import { CareerModePageModule } from './../pages/career-mode/career-mode.module';
import { ModeSelectionPageModule } from './../pages/mode-selection/mode-selection.module';
import { HttpTokenInterceptor } from './../shared/interceptor/http-token.interceptor';
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
import { LoadingProvider } from '../providers/loading/loading';


export const MODULES = [
  BrowserModule,
  HttpClientModule,

  LoginPageModule,
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
  SocialSharing,

  // FIRESTORE AUTH PROVIDER
  AngularFireAuth,

  // CUSTOM PROVIDERS
  AuthProvider,
  TalkHawkApiProvider,
  LoadingProvider,
  ShareContentProvider,

  // SERVICE WORKERS

  // INTERCEPTORS
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }

];

export const DIRECTIVES = [
  // AsyncImgLoaderDirective
];
