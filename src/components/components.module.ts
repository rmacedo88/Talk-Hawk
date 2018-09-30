import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CtaComponent } from './cta/cta';

const COMPONENTS = [
  CtaComponent,
]

@NgModule({
  declarations: [COMPONENTS],
  entryComponents: [COMPONENTS],
  imports: [IonicModule],
  exports: [COMPONENTS]
})
export class ComponentsModule { }
