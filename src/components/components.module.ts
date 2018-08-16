import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CtaComponent } from './cta/cta';
@NgModule({
  declarations: [CtaComponent],
  entryComponents: [CtaComponent],
  imports: [IonicModule],
  exports: [CtaComponent]
})
export class ComponentsModule { }
