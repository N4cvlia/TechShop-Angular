import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDir]'
})
export class DirDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

}
