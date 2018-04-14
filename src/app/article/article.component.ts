import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document : Document,
    private _route : ActivatedRoute,
  private _router : Router) { }

  ngOnInit() {
    const isSelected = this._route.snapshot.queryParamMap.get('selected');
    if(isSelected) this._document.documentElement.scrollTo(0,0);
    // this line if for clearing the query params from page url
    this._router.navigate(['.'], { relativeTo: this._route, queryParams: {} });
  }

}
