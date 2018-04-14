import { ArticlesInfoService } from './../services/articles-info.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Article } from '../services/Article';
import { LIVE_ANNOUNCER_PROVIDER } from '@angular/cdk/a11y';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  @ViewChild('ArticlesHeader') public articleHeader: ElementRef;
  constructor(private _router: Router,
    private _articlesInfo: ArticlesInfoService) {
    this._articlesInfo.fetchArticles()
      .subscribe(arts => this.articles = arts);
  }

  ngOnInit() {
  }

  selectArticle(articleID: string) {
    const params: NavigationExtras = {
      // skipLocationChange : true,
      queryParams: {
        selected: true
      }
    }
    this._router.navigate(['/article', articleID], params);
  }
}
