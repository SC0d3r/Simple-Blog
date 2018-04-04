import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSmallScreen : boolean;
  constructor() { }

  ngOnInit() {
    this._showOrRemoveLinks(window.outerWidth);
  }
  onResize(e){
    const width = e.target.outerWidth;
    // console.log(width);
    this._showOrRemoveLinks(width);
  }

  private _showOrRemoveLinks(width: any) {
    if (width <= 800) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }

}
