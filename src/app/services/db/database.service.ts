import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const url: string = environment.host + '/api/votes';
// console.log(`from angular host - ${url}`);
@Injectable()
export class DatabaseService {

  constructor(private _httpClient: HttpClient) {
  }
  hasIPVoted(articleID: string): Promise<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post(url+'/checkIP',
      { articleID },httpOptions)
      .toPromise();
  }
  saveVote(articleID: string, vote: "like" | "dislike"): Promise<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post(url+'/saveVote',
      { articleID, vote},httpOptions)
      .toPromise();
  }

}
