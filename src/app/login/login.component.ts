import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide : boolean;
  username : string;
  password : string;
  constructor(private _auth : AuthService,private _router : Router) { 
    this.hide = true;
  }

  ngOnInit() {
  }
  
  login(){
    if(this.password.length === 0 || this.username.length === 0)
      return;
    this._auth.login().subscribe(isLogged => {
      this._router.navigate(['/admin']);
    });
  }
}
