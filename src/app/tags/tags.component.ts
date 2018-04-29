import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tag: string;
  constructor(
    private _route: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document,
    private _meta: Meta,
    private _title: Title
  ) {
    this.tag = '';
    this._meta.addTag({ name: 'author', content: 'Sasan Kelishani' });
  }
  
  ngOnInit() {
    const tagName = this._route.snapshot.paramMap.get('tagName') || '';
    this._title.setTitle(`Searching Tag : ${tagName}`);
    this._meta.addTag({ name: 'description', content: `searching articles for tag ${tagName}`});
    this._meta.addTag({ name: 'keywords', content: `article,programming,${tagName}` });
    this.tag = tagName;

    this._document.documentElement.scrollTo(0, 0);
  }

}
