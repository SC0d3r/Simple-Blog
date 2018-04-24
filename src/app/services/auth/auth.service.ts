import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import * as hash from 'hash.js';

const authURL = environment.host + '/auth';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  private _attempts: number;
  private _isTimeoutSet: boolean;
  constructor(private _httpClient: HttpClient) {
    this._attempts = 0;
    this._isTimeoutSet = false;
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Promise<boolean> {
    if (this._attempts === 3) {
      this._giveAccessAfter(1000 * 60 * 3);
      return Promise.reject(new Error('Too many attempts retry after 3 min'));
    }
    const p = (<any>hash).sha256().update(password + username).digest('hex');
    this._attempts++;
    return this._httpClient.post<{ authenticated: boolean }>(authURL,
      { usernamePasswordHash: p }).toPromise().then(({authenticated}) => {
        const isOk = authenticated;
        if (isOk) this._attempts = 0;
        this.isLoggedIn = isOk;
        return isOk;
      });
  }

  private _giveAccessAfter(ms: number) {
    if (this._isTimeoutSet) return;
    this._isTimeoutSet = true;
    setTimeout(() => {
      this._attempts = 0;
      this._isTimeoutSet = false;
    }, ms);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
