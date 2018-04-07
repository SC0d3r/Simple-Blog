import { ArticlesInfoService } from './../services/articles-info.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../services/Article';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  constructor(private _router: Router,
    private _articlesInfo: ArticlesInfoService) {
    this._articlesInfo.fetchArticles()
      .subscribe(arts => this.articles = arts);
  }

  ngOnInit() {
  }

  selectArticle(articleID: string) {
    this._router.navigate(['/article', articleID]);
  }
}
