import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the CtaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'call-to-action',
  templateUrl: 'cta.html'
})
export class CtaComponent {

  @Input() icon;
  @Input() label;

  @Output() action = new EventEmitter();

  constructor() {
    console.log('Hello CtaComponent Component');
  }

  callToAction($event) {
    this.action.emit({ eventName: $event });
  }

}
