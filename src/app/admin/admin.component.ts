import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title : string = '';
  shortDescription : string = '';
  body : string = '';
  tags : string = '';
  constructor() { }

  ngOnInit() {
  }

  onPost(){
    //TODO : create a article and save it do database
  }
  onPreview(){
    //TODO : show how the article looks in the blog
  }
}
