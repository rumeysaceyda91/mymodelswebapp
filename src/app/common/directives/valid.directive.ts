import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValid]',
  standalone: true
})
export class ValidDirective {

  @Input() appValid: boolean = false;
  constructor(private _e1: ElementRef<any>) { }

  @HostListener("keyup") keyup(){
    if(this.appValid)
    {
        this._e1.nativeElement.className = "form-control is-valid";
    }else
    {
      this._e1.nativeElement.className = "form-control is-invalid";
    }
  }
}
