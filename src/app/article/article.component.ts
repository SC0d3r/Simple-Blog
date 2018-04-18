import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { ArticlesInfoService } from '../services/articles-info.service';
import { Article } from '../services/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  constructor(
    @Inject(DOCUMENT) private _document : Document,
    private _route : ActivatedRoute,
    private _aritcleInfo: ArticlesInfoService,
  private _router : Router) { }

  ngOnInit() {
    const articleID = this._route.snapshot.paramMap.get('id');
    this._aritcleInfo.fetchArticleByID(articleID)
    .subscribe(art => {
      if(art) this.article = art;
      else {
        this._router.navigate(['/']);
      }
    });

    const isSelected = this._route.snapshot.queryParamMap.get('selected');
    if(isSelected) this._document.documentElement.scrollTo(0,0);
    // this line if for clearing the query params from page url
    this._router.navigate(['.'], { relativeTo: this._route, queryParams: {} });

  }

}
