import { Directive, ElementRef, OnInit, Renderer2,
  HostListener, HostBinding, Host, Input, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: '[dropDownShow]'
})
export class DropDownDirective implements OnInit {

  @Output()
  isShowState: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.show')
  isShown: boolean = false;

  @HostListener('click', ['$event.target'])
  onClick(btn: any) {
    if (btn.id === 'dropdownMenuButton') {
      this.isShown = !this.isShown;
      this.isShowState.emit(this.isShown);
    }
  }

  @HostListener('document:click', ['$event.target'])
  documentClick(tar: HTMLButtonElement) {
    if (tar.id !== 'dropdownMenuButton') {
      if (this.isShown) {
        this.isShown = false;
        this.isShowState.emit(false);
      }
    }
  }

  constructor(public eleRef: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
  }
}
