import { dummyArticles } from './dummyArticles';
import { Article } from './Article';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  constructor() {
    this.articles = dummyArticles;
  }

  ngOnInit() {
  }

}
