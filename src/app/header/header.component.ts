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
    this.isSmallScreen = true;
  }
  onResize(e){
    const width = e.target.outerWidth;
    console.log(width);
    if(width <= 800){
      this.isSmallScreen = true;
    }else {
      this.isSmallScreen = false;
    }
  }
}
