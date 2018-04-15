import { ArticlesInfoService } from './../services/articles-info.service';
import { Article } from './../services/Article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title: string = '';
  shortDescription: string = '';
  body: string = '';
  tags: string = '';
  img: string = '';
  constructor(private _articleInfo: ArticlesInfoService) { }

  ngOnInit() {
    // TODO : editin article
  }

  onPost() {
    //TODO : create a article and save it do database
    if (notValid(this.body) ||
      notValid(this.title) ||
      notValid(this.tags) ||
      notValid(this.shortDescription) /*||
  notValid(this.img)*/) {
      return;
    }
    const newArticle = createArticle(
      this.img,
      this.title,
      this.shortDescription,
      this.body,
      this.tags);

    this._articleInfo.saveArticle(newArticle);
    this._reset();
  }
  private _reset() {
    this.title = '';
    this.img = '';
    this.shortDescription = '';
    this.body = '';
    this.tags = '';
  }
  onPreview() {
    //TODO : show how the article looks in the blog
  }
}

function notValid(x: string) {
  return typeof x !== 'string' || x.length === 0;
}
function createArticle(img, title, shortDesc, body, tags) {
  const article: Article = {
    id: guid(),
    img: {
      src: img,
      alt: 'Image for article'
    },
    title,
    shortDescription: shortDesc,
    body,
    tags,
    date: Date.now()
  }
  return article;
}

function guid() {
  return Math.random().toString(36).substring(2)
    + (new Date()).getTime().toString(36);
}