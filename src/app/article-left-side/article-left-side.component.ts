import { Article } from './../services/Article';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-article-left-side',
  templateUrl: './article-left-side.component.html',
  styleUrls: ['./article-left-side.component.css']
})
export class ArticleLeftSideComponent implements OnChanges {
  articleDate: string;
  @Input() article: Article;
  constructor(private _router: Router) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    const newArticle : SimpleChanges = <any>changes.article;

    if(newArticle.currentValue === undefined) return;
    
    const articleDate = (<any>newArticle).currentValue.date;
    if(articleDate){
      const date: any = new Date(articleDate);
      const locale = "en-us",
        month = date.toLocaleString(locale, { month: "short" }),
        day = date.toLocaleString(locale, { day: "numeric" }),
        year = date.toLocaleString(locale, { year: "numeric" });
      this.articleDate = `${month} ${day} , ${year}`;
    }
  }
  
  goHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "homePage": true
      }
    };
    this._router.navigate(['/'], navigationExtras);
  }
  openAboutMe() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "aboutMe": true
      }
    };
    this._router.navigate(['/'], navigationExtras);
  }
  openContactMe() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "contactMe": true
      }
    };
    this._router.navigate(['/'], navigationExtras);
  }
  openSubscribe() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "Subscribe": true
      }
    };
    this._router.navigate(['/'], navigationExtras);
  }
}
