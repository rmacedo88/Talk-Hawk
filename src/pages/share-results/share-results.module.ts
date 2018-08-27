import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareResultsPage } from './share-results';

@NgModule({
  declarations: [
    ShareResultsPage,
  ],
  entryComponents: [
    ShareResultsPage
  ],
  imports: [
    IonicPageModule.forChild(ShareResultsPage),
  ],
})
export class ShareResultsPageModule { }
