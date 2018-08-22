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
  @Input() path;
  @Input() label;
  @Input() extraParameters;

  @Output() action = new EventEmitter();

  constructor() {
  }

  callToAction() {
    this.action.emit({ eventName: this.extraParameters || this.icon });
  }

}
