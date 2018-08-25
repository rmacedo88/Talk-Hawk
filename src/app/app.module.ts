import { TalkHawkErrorHandler } from './../shared/error-handler/talk-hawk-error-handler';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './environment/environment';
import { MODULES, PROVIDERS, DIRECTIVES } from './app.resources';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { TalkHawkApiProvider } from '../providers/talk-hawk-api/talk-hawk-api';
import { LoadingProvider } from '../providers/loading/loading';
import { ShareContentProvider } from '../providers/share-content/share-content';

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
    AuthProvider,
    TalkHawkApiProvider,
    LoadingProvider,
    ShareContentProvider,
  ]
})
export class AppModule { }
