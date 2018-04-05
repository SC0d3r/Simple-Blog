import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('window:wheel', ['$event'])
  onScrollEvent($event) {
    slide($event.deltaY < 0 , 15);
  }
}


function slide(shouldGoUp , howManyTimes){
  if (howManyTimes <= 0) return;
  
  const amountToScroll = (shouldGoUp ? -1 : 1) * 8;
  window.scrollTo(0,window.scrollY + amountToScroll);

  window.requestAnimationFrame(() => slide(shouldGoUp,howManyTimes-1));
}
