import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[productHover]'
})
export class productHoverDirective {
    @HostBinding('class.productHover') productHover = false;
    @HostListener('mouseenter') onMouseEnter() {
        this.productHover = true;
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.productHover = false;
    }
}