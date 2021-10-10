import { Component } from '@angular/core';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent {
  /* @ViewChild('parallax') elem;
  constructor() {
    document.addEventListener("mousemove", this.onMouseMove);
    this.elem = document.querySelector("#parallax");
  } */

  /*  @HostListener('document:mousemove', ['$event'])
   onMouseMove(event: MouseEvent) {
     let _w = window.innerWidth / 2;
     let _h = window.innerHeight / 2;
     let _mouseX = event.clientX;
     let _mouseY = event.clientY;
     let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
     let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
     let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
     let x = `${_depth3}, ${_depth2}, ${_depth1}`;
     console.log(x);
     this.elem.style.backgroundPosition = x;
   } */
}

