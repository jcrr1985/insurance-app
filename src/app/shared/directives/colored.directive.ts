import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColored]'
})
export class ColoredDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'rgba(122,72,212,.3)');
   }

}
