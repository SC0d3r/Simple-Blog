import { Component, OnInit } from '@angular/core';
import { dummyArticle } from './dummyArticle';

@Component({
  selector: 'app-article-right-side',
  templateUrl: './article-right-side.component.html',
  styleUrls: ['./article-right-side.component.css']
})
export class ArticleRightSideComponent implements OnInit {
  article : any;
  constructor() {
    this.article = dummyArticle;
   }

  ngOnInit() {
  }

}
