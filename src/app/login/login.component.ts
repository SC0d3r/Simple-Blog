import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean;
  username: string;
  password: string;
  tooManyAttempts: string;
  constructor(private _auth: AuthService, private _router: Router) {
    this.hide = true;
    this.tooManyAttempts = '';
  }

  ngOnInit() {
  }

  login() {
    if (this.password.length === 0 || this.username.length === 0)
      return;
    this._auth.login(this.username, this.password).then(isLogged => {
      this._router.navigate(['/admin']);
    }).catch(err => {
      if (this.tooManyAttempts.length === 0) {
        this.tooManyAttempts = '* Too many attmepts retry after 3min';
        setTimeout(() => this.tooManyAttempts = '', 2000);
      }
    });
  }
}
