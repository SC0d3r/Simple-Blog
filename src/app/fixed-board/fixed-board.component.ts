import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-fixed-board',
  templateUrl: './fixed-board.component.html',
  styleUrls: ['./fixed-board.component.css']
})
export class FixedBoardComponent implements OnInit {
  shouldStart : boolean;
  shouldStart2 : boolean;
  @ViewChild('spa') spa: ElementRef;
  @ViewChild('span2') span2: ElementRef;
  constructor(@Inject(PLATFORM_ID) private _platformID : Object) {
    this.shouldStart = false;
    this.shouldStart2 = false;
  }

  ngOnInit() {
    if(isPlatformBrowser(this._platformID)){
      const span: HTMLSpanElement = this.spa.nativeElement;
      const span2 : HTMLSpanElement = this.span2.nativeElement;
      span.addEventListener(whichAnimationEvent(), event => {
        span.style.display = 'none';
        span.style.animationName = '';
        this.shouldStart = true;
      });
      span2.addEventListener(whichAnimationEvent(), event => {
        // span2.style.display = 'none';
        // span2.style.animationName = '';
        // this.shouldStart2 = true;
      });
    }
  }

}

function whichAnimationEvent() {
  var t,
    el = document.createElement("fakeelement");

  var animations = {
    "animation": "animationend",
    "OAnimation": "oAnimationEnd",
    "MozAnimation": "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}