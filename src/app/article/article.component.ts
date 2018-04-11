import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document : Document,
    private _route : ActivatedRoute) { }

  ngOnInit() {
    const isSelected = this._route.snapshot.queryParamMap.get('isSelected');
    if(isSelected) this._document.documentElement.scrollTo(0,0);
  }

}
