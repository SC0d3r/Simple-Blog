import { DatabaseService } from './db/database.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/mergeMap';

import { dummyArticles } from './dummyArticles';
import { Article } from './Article';

@Injectable()
export class ArticlesInfoService {
  articles: Article[];
  constructor(private _db: DatabaseService) {
    // this.articles = dummyArticles;
  }

  fetchArticles(howMany: number = -1): Observable<Article[]> {
    // -1 means all the articles
    return this._db.fetchArticles(howMany)
      .map(arts => {
        this.articles = arts;
        return arts;
      });
    // return of(this.articles);
  }
  fetchArticlesByTag(tagName: string): Observable<Article[]> {
    const matchTags = tag => tag === tagName;
    const onlyMatchedTags = article => article.tags.some(matchTags);
    if (this.articles) {
      const articles = this.articles.filter(onlyMatchedTags);
      return of(articles);
    } else {
      //first time visit [not called fetchArticles method before]
      return this._db.fetchArticlesByTag(tagName);
    }
  }
  fetchArticleByID(id: string): Observable<Article | null> {
    if (this.articles) {
      const article = this.articles.filter(art => art.id === id);
      return of(article[0]);
    } else {
      //first time visit [not called fetchArticles method before]
      return this._db.fetchArticleByID(id).mergeMap(maybeArticle => {
        if (maybeArticle) return of(maybeArticle);
        return of(null);// article not found WEIRD
      });
    }
  }

  hasIPVoted(articleID: string): Promise<Object> {
    return this._db.hasIPVoted(articleID);
  }
  saveVote(articleID: string, vote: 'like' | 'dislike') {
    return this._db.saveVote(articleID, vote);
  }
  saveArticle(article: Article) {
    this._db.saveArticle(article);
  }
  delArticle(articleID: string) {
    return this._db.delArticle(articleID).then(data => {
      if (data.isDeleted) {
        const index = this.articles.findIndex(art => art.id === articleID);
        if (index >= 0) this.articles.splice(index, 1);
        else console.error('something strange happend article deleted in server but not in client');
      }
      return data.isDeleted;
    });
  }
  uploadImage(file: File, imageName: string) {
    //create form data
    const formData: FormData = new FormData();
    formData.append("articleImage", file);
    formData.append("imageName", imageName);
    this._db.uploadImage(formData);
  }
}
