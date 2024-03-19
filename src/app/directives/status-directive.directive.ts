import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusDirective]'
})
export class StatusDirectiveDirective implements OnInit {

  @Input() appStatusDirective!: string; // Giá trị status được truyền vào từ component

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }
 
  ngOnInit() {
    if (this.appStatusDirective == '1') {
      this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Nghỉ học');
    } else if (this.appStatusDirective == '2') {
      this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Đi học');
    }
  }
}
