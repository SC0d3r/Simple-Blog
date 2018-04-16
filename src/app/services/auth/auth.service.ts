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
  constructor(private _httpClient: HttpClient) { }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Promise<boolean> {
    const p = (<any>hash).sha256().update(password).digest('hex');
    return this._httpClient.get(authURL).toPromise().then(data => {
      const hash = (<any>data).auth;
      const isOk = hash === p;
      this.isLoggedIn = isOk;
      return isOk;
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
