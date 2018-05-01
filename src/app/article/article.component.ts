import { ViewsService } from './../services/views/views.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ArticlesInfoService } from '../services/articles-info.service';
import { Article } from '../services/Article';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  views: number;
  constructor(
    @Inject(PLATFORM_ID) public plafromID: any,
    @Inject(DOCUMENT) private _document: Document,
    private _route: ActivatedRoute,
    private _aritcleInfo: ArticlesInfoService,
    private _views: ViewsService,
    private _router: Router,
    private _meta: Meta,
    private _title: Title) {
    this._meta.addTag({ name: 'author', content: 'Sasan Kelishani' });
  }
  ngOnInit() {
    const articleID = this._route.snapshot.paramMap.get('id');
    this._aritcleInfo.fetchArticleByID(articleID)
      .subscribe(art => {
        if (art) {
          this.article = art;
          this._title.setTitle(art.title);
          this._meta.addTag({ name: 'description', content: art.shortDescription });
          this._meta.addTag({ name: 'keywords', content: art.tags.join(',') });
          this._views.increaseArticleView(articleID).then((result) => {
            this.views = (result && result.visits) || 0;
          });
        }
        else {
          this._router.navigate(['/']);
        }
      });

    if (isPlatformBrowser(this.plafromID)) {
      this._document.documentElement.scrollTo(0, 0);
    }

    // with above line of code it will go to the top of the page
    // even if we use forward arrow of browser
    // if you dont want that ,comment top and uncomment below
    // and add attr fragment="top" to the articles routerLink

    // const shouldGoToTheTop = this._route.snapshot.fragment;
    // if (shouldGoToTheTop) {
    //   // this line if for clearing the query params from page url
    //   this._document.documentElement.scrollTo(0, 0);
    //   this._router.navigate(['.'], { relativeTo: this._route, fragment: null, replaceUrl: true });
    // }
  }

}
