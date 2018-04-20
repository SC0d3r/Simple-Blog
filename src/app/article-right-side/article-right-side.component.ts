import { isPlatformBrowser } from '@angular/common';
import { Article } from './../services/Article';
import { ArticlesInfoService } from './../services/articles-info.service';
import { Component, Input, OnChanges, SimpleChanges, PLATFORM_ID, Inject, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { MarkdownService } from 'angular2-markdown';

@Component({
  selector: 'app-article-right-side',
  templateUrl: './article-right-side.component.html',
  styleUrls: ['./article-right-side.component.css']
})
export class ArticleRightSideComponent implements OnChanges, OnInit {
  @Input() article: Article;
  pageID = '';
  userID: any;
  isVoted: boolean;
  body : any;
  isServer : boolean;
  isBrowser : boolean;
  constructor(
    private _aritcleInfo: ArticlesInfoService,
    private _markdown: MarkdownService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isVoted = false;
    this.isBrowser = false;
    this.isServer = true;
  }
  ngOnInit(): void {
    this._markdown.renderer.image = (src: string) => {
      return `<img src = "${src}" style = "/*border : 1px solid red;*/max-width : 90%;display : block;margin:5% auto;">`;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(isPlatformBrowser(this.platformId)){
      this.isServer = false;
      this.isBrowser = true;
    }
    const newArticle: SimpleChanges = <any>changes.article;
    // console.log(newArticle);
    if (newArticle.currentValue === undefined) return;
    // this.article = newArticle.currentValue;
    this.body = this._markdown.compile(this.article.body);
    this._aritcleInfo.hasIPVoted(this.article.id).then(data => {
      this.isVoted = (<any>data).voted;
    }).catch(err => {
      console.log('error in hapIPVoted');
      console.log(err);
    });

    this.pageID = `/article/${this.article.id}`;
  }

  onVote(vote: 'like' | 'dislike') {
    if (this.isVoted) return;
    this.isVoted = true;
    this._aritcleInfo.saveVote(this.article.id, vote);
  }
}
