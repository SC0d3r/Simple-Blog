import { Article } from './../services/Article';
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
  article: Article;
  pageID = '';
  userID : any;
  isVoted: boolean;
  constructor(private _aritcleInfo: ArticlesInfoService,
    private _route: ActivatedRoute, 
    private _markdown: MarkdownService
  ) {
    this.isVoted = false;
  }

  ngOnInit() {
    const articleID = this._route.snapshot.paramMap.get('id');
    this._aritcleInfo.fetchArticleByID(articleID)
    .subscribe(art => this.article = art);
    
    this._aritcleInfo.hasIPVoted(articleID).then(data => {
      this.isVoted = (<any>data).voted;
    }).catch(err => {
      console.log('error in hapIPVoted');
      console.log(err);
    });
    
    this._markdown.renderer.image = (src: string) => {
      return `<img src = "${src}" style = "/*border : 1px solid red;*/width : 80%;display : block;margin:5% auto;">`;
    }
    this.pageID = `/article/${this.article.id}`;
  }
  
  onVote(vote: 'like' | 'dislike') {
    if(this.isVoted) return;
    this.isVoted = true;
    this._aritcleInfo.saveVote(this.article.id , vote);
  }
}
