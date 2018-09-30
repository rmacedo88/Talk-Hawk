import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { TextSpeakProvider } from '../providers/text-speak/text-speak';
import { UtilsProvider } from '../providers/utils/utils';
import { TalkHawkErrorHandler } from './../shared/error-handler/talk-hawk-error-handler';
import { MyApp } from './app.component';
import { DIRECTIVES, MODULES, PROVIDERS } from './app.resources';
import { firebaseConfig } from './environment/environment';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DIRECTIVES,
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp, {
      animate: false,
      scrollAssist: false,
      autoFocusAssist: false,
      scrollPadding: false
    }),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    PROVIDERS,
    { provide: ErrorHandler, useClass: TalkHawkErrorHandler },
    UtilsProvider,
    TextSpeakProvider,
  ]
})
export class AppModule { }
