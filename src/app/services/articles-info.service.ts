import { DatabaseService } from './db/database.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { dummyArticles } from './dummyArticles';
import { Article } from './Article';
import { DB } from './db/DB';

@Injectable()
export class ArticlesInfoService {
  articles: Article[];
  constructor(private _db: DatabaseService) {
    this.articles = dummyArticles;
  }

  fetchArticles(howMany: number = -1): Observable<Article[]> {
    // -1 means all the articles
    return of(this.articles);
  }

  fetchArticleByID(id: string): Observable<Article> {
    const article = this.articles.filter(art => art.id === id);
    return of(article[0]);
  }

  hasIPVoted(articleID: string): Promise<Object> {
    return this._db.hasIPVoted(articleID);
  }
  saveVote(articleID: string, vote: 'like' | 'dislike') {
    return this._db.saveVote(articleID, vote);
  }

}
