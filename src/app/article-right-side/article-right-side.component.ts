import { ActivatedRoute } from '@angular/router';
import { ArticlesInfoService } from './../services/articles-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-right-side',
  templateUrl: './article-right-side.component.html',
  styleUrls: ['./article-right-side.component.css']
})
export class ArticleRightSideComponent implements OnInit {
  article: any;
  constructor(private _aritcleInfo: ArticlesInfoService,
    private _route: ActivatedRoute) {
    const articleID = this._route.snapshot.paramMap.get('id');
    this._aritcleInfo.fetchArticleByID(articleID)
      .subscribe(art => this.article = art);
  }

  ngOnInit() {
  }

}
