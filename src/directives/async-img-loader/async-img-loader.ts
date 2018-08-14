import { Directive, Renderer2, ElementRef, Input } from '@angular/core';

/**
 * Generated class for the AsyncImgLoaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({

  selector: '[load], [pattern]' // Attribute selector
})
export class AsyncImgLoaderDirective {

  @Input()
  ref = 'primary-pattern';

  constructor(private el: ElementRef, private render: Renderer2) {

  }

  ngOnInit() {
    // setTimeout(() => {
    //   if (this.el.nativeElement.tagName === 'IMG') {
    //     this.render.setProperty(this.el.nativeElement, 'src', this.getImageReference(this.ref));
    //   } else {
    //     let newImage = this.render.createElement('IMG');
    //     this.render.addClass(newImage, 'background-image');
    //     this.render.setProperty(newImage, 'src', `${this.getImageReference(this.ref)}`);
    //     this.render.insertBefore(this.el.nativeElement, newImage, this.el.nativeElement.firstChild);
    //   }

    // }, 100);
  }

  ngAfterViewInit() {

    // if (!this.el.nativeElement.cached) {
    //   setTimeout(() => {

    // this.render.setAttribute(this.el.nativeElement, 'cached', 'true');
    // if (this.el.nativeElement.tagName === 'IMG') {
    //   this.render.setProperty(this.el.nativeElement, 'src', this.getImageReference(this.ref));
    // } else {
    //   let newImage = this.render.createElement('IMG');
    //   this.render.addClass(newImage, 'background-image');
    //   this.render.setProperty(newImage, 'src', `${this.getImageReference(this.ref)}`);
    //   this.render.insertBefore(this.el.nativeElement, newImage, this.el.nativeElement.firstChild);
    // }
    // if (this.el.nativeElement.tagName === 'ION-CONTENT') {
    //   this.render.addClass(this.el.nativeElement, 'background-pattern');
    // }

    //   }, 50);
    // }
  }

  public getImageReference(code: string) {

    let ref;
    switch (code) {
      case 'primary-pattern':
      case 'blue-pattern':
      case 'career':
      case 'eagle':
      case 'exam':
      case 'primary-background-pattern':
      case 'red-pattern':
      case 'vocabulary':
        ref = `${code}.svg`;
        break;

      default:
        ref = 'preload.png'
        break;
    }

    return `../assets/imgs/${ref}`;
  }


}
