import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-left-side',
  templateUrl: './article-left-side.component.html',
  styleUrls: ['./article-left-side.component.css']
})
export class ArticleLeftSideComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  goHomePage() {
    this._router.navigate(['/']);
  }
  openAboutMe() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "aboutMe" : true
      }
    };
    this._router.navigate(['/'] , navigationExtras);
  }
  openContactMe() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "contactMe" : true
      }
    };
    this._router.navigate(['/'] , navigationExtras);
  }
}
