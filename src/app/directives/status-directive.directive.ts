import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStatusDirective]'
})
export class StatusDirectiveDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appStatusDirective(status: number) {
    this.viewContainer.clear();
    if (status === 1) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      console.log(this.viewContainer.createEmbeddedView(this.templateRef));
    }
  }
}
