import { ViewsService } from './../views/views.service';
import { Observable } from 'rxjs/Observable';
import { Article } from './../Article';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const apiURL = environment.host + '/api';
const votesURL: string = apiURL + '/votes';
const articlesURL = apiURL + '/articles';
// console.log(`from angular host - ${url}`);
@Injectable()
export class DatabaseService {

  constructor(private _httpClient: HttpClient,
    private _views: ViewsService) {
  }

  //votes
  hasIPVoted(articleID: string): Promise<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post(votesURL + '/checkIP',
      { articleID }, httpOptions)
      .toPromise();
  }
  saveVote(articleID: string, vote: "like" | "dislike"): Promise<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post(votesURL + '/saveVote',
      { articleID, vote }, httpOptions)
      .toPromise();
  }

  //articles
  saveArticle(article: Article) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this._httpClient.post(articlesURL + '/save', { article }, httpOptions).toPromise();
  }
  delArticle(articleID: string): Promise<{ isDeleted: boolean }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const delArticle = this._httpClient.post(
      articlesURL + "/delete", { articleID }, httpOptions
    ).toPromise();
    const delArtilceVotes = this._httpClient.post(
      votesURL + '/delVotes', { articleID }, httpOptions
    ).toPromise();
    const delArticleViews = this._views.delArticleViews(articleID);
    return Promise.all([delArticle, delArtilceVotes, delArticleViews]).then(
      results => {
        const [isArticleDeleted, isArtilceVotesDeleted, isArtilceViewsDeleted] = results;
        return {
          isDeleted: (<{ isDeleted: boolean }>isArticleDeleted).isDeleted &&
            (<{ isDeleted: boolean }>isArtilceVotesDeleted).isDeleted &&
            isArtilceViewsDeleted.isDeleted
        };
      });
  }

  fetchArticles(howMany = -1) {
    // -1 means all
    return this._httpClient.get<Article[]>(articlesURL + '/' + howMany);
  }
  fetchArticlesByTag(tagName: string): Observable<Article[]> {
    return this._httpClient.get<Article[]>(articlesURL + '/tag/' + tagName);
  }
  fetchArticleByID(id: string) {
    return this._httpClient
      .get<{ article: Article, found: boolean }>(articlesURL + '/id/' + id)
      .map(data => {
        const { article, found } = data;
        if (!found) {
          console.error(`article with id ${id} not found in db`);
        }
        return article || [];
      });
  }
  uploadImage(formData: FormData) {
    this._httpClient.post(articlesURL + '/image', formData).toPromise();
  }
}
