import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const apiURL = environment.host + '/api';
const viewsURL = apiURL + '/article/veiws'
@Injectable()
export class ViewsService {

  constructor(private _httpClient: HttpClient) { }
  getArticleViews(articleID: string) {
    return this._httpClient.get<{ visits: number }>(viewsURL + '/' + articleID).toPromise();
  }
  increaseArticleView(articleID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post<{ visits: number }>(viewsURL, { articleID }, httpOptions).toPromise().catch(err => {
      if (err) console.error(err);
    });
  }
  delArticleViews(articleID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient
      .post<{isDeleted : boolean}>(viewsURL + '/delete', {articleID}, httpOptions)
      .toPromise();
  }
}
