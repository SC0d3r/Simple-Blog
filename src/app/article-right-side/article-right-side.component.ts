import { ActivatedRoute } from '@angular/router';
import { ArticlesInfoService } from './../services/articles-info.service';
import { Component, OnInit } from '@angular/core';

import { MarkdownService } from 'angular2-markdown';

@Component({
  selector: 'app-article-right-side',
  templateUrl: './article-right-side.component.html',
  styleUrls: ['./article-right-side.component.css']
})
export class ArticleRightSideComponent implements OnInit {
  article: any;
  constructor(private _aritcleInfo: ArticlesInfoService,
    private _route: ActivatedRoute,
    private _markdown: MarkdownService
  ) {
    const articleID = this._route.snapshot.paramMap.get('id');
    this._aritcleInfo.fetchArticleByID(articleID)
      .subscribe(art => this.article = art);
  }

  ngOnInit() {
    this._markdown.renderer.image = (src: string) => {
      // console.log(img);
      return `<img src = "${src}" style = "/*border : 1px solid red;*/width : 80%;display : block;margin:5% auto;">`;
    }
  }

}
