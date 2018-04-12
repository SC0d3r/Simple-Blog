import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { ArticlesComponent } from '../articles/articles.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild(ArticlesComponent) private articlesComponent: Component;
  constructor(private _location: Location,
    @Inject(DOCUMENT) private _document: Document,
    private _router: Router) {

  }

  ngOnInit() {
    this._location.subscribe(event => {
      this._router.navigate(['/']).then(() => {
        // console.log(this.articlesComponent);
        const artilceHeader: Element = (<ElementRef>
          (<any>this.articlesComponent).articleHeader).nativeElement;
        artilceHeader.scrollIntoView(true);
        // this._document.documentElement.scrollIntoView({});
      });
    });
  }

}
