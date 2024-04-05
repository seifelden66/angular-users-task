import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appSize]',
  standalone: true,
})
export class SizeDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.setScale(1); 
    this.setTransition('transform 0.3s'); 
  }

  setScale(scale: number) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      `scale(${scale})`
    );
  }

  setTransition(transition: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transition',
      transition
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setScale(1.03); 
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setScale(1); 
  }
}
