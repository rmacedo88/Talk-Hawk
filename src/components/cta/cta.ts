import { Component, Input, Output, EventEmitter } from '@angular/core';

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
