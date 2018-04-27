import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tag : string;
  constructor(
    private _route : ActivatedRoute
  ) { 
    this.tag = '';
  }

  ngOnInit() {
    console.log(this._route.snapshot.paramMap.get('tagName'));
    this.tag = this._route.snapshot.paramMap.get('tagName') || '';
  }

}
