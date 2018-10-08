import { PipesModule } from './../pipes/pipes.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { AngularFireAuth } from 'angularfire2/auth';
import { Keyboard, Nav } from 'ionic-angular';
import { DirectivesModule } from '../directives/directives.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ShareResultsPageModule } from '../pages/share-results/share-results.module';
import { AuthProvider } from '../providers/auth/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { TalkHawkApiProvider } from '../providers/talk-hawk-api/talk-hawk-api';
import { CareerModePageModule } from './../pages/career-mode/career-mode.module';
import { ChooseExamLevelPageModule } from './../pages/choose-exam-level/choose-exam-level.module';
import { ExamModePageModule } from './../pages/exam-mode/exam-mode.module';
import { ModeSelectionPageModule } from './../pages/mode-selection/mode-selection.module';
import { VocabularyModePageModule } from './../pages/vocabulary-mode/vocabulary-mode.module';
import { ShareContentProvider } from './../providers/share-content/share-content';
import { TextSpeakProvider } from './../providers/text-speak/text-speak';
import { UtilsProvider } from './../providers/utils/utils';
import { VoiceRecognitionProvider } from './../providers/voice-recognition/voice-recognition';
import { HttpTokenInterceptor } from './../shared/interceptor/http-token.interceptor';

export const MODULES = [
  BrowserModule,
  HttpClientModule,

  LoginPageModule,
  ModeSelectionPageModule,
  ChooseExamLevelPageModule,
  CareerModePageModule,
  ExamModePageModule,
  ShareResultsPageModule,
  VocabularyModePageModule,

  DirectivesModule,
  PipesModule
];

export const PROVIDERS = [

  // IONIC PROVIDERS
  StatusBar,
  SplashScreen,
  Nav,
  Keyboard,
  SocialSharing,
  SpeechRecognition,
  Network,
  TextToSpeech,


  // FIRESTORE AUTH PROVIDER
  AngularFireAuth,


  // CUSTOM PROVIDERS
  AuthProvider,
  TalkHawkApiProvider,
  LoadingProvider,
  ShareContentProvider,
  VoiceRecognitionProvider,
  UtilsProvider,
  TextSpeakProvider,

  // SERVICE WORKERS

  // INTERCEPTORS
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }

];

export const DIRECTIVES = [
  // AsyncImgLoaderDirective
];
