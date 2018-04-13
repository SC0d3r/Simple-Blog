import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) public plafromID: any,
    private _route: Router) {
    if (isPlatformBrowser(plafromID)) {
      const GridNotSupported = !CSS.supports('display', 'grid');
      if (GridNotSupported) {
        this._route.navigate(['/notSupported']);
      }
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.plafromID)) {
      window.addEventListener('wheel', event => {
        slide(window, event.deltaY < 0, 15);
      });
    }
  }

}
function slide(win, shouldGoUp, howManyTimes) {
  if (howManyTimes <= 0) return;

  const amountToScroll = (shouldGoUp ? -1 : 1) * 8;
  win.scrollTo(0, win.scrollY + amountToScroll);

  win.requestAnimationFrame(() => slide(win, shouldGoUp, howManyTimes - 1));
}
