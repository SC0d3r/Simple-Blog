import { DatabaseService } from './db/database.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
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
  saveArticle(article: Article) {
    this._db.saveArticle(article);
  }
  uploadImage(file: File, imageName: string) {
    //create form data
    const formData: FormData = new FormData();
    formData.append("articleImage", file);
    formData.append("imageName" , imageName);
    this._db.uploadImage(formData);
  }
}
