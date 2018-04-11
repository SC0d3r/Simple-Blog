import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(PLATFORM_ID) plafromID : any,
private _route : Router){
    if(isPlatformBrowser(plafromID)){
      const GridNotSupported = !CSS.supports('display' , 'grid');
      if(GridNotSupported){
        this._route.navigate(['/notSupported']);
      }
    }
  }
}

