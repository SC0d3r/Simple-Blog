import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { ArticlesComponent } from '../articles/articles.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild(ArticlesComponent) private articlesComponent: Component;
  constructor(private _location: Location,
    @Inject(DOCUMENT) private _document: Document,
    private _router: Router,
    private _meta: Meta,
    private _title: Title) {

    this._title.setTitle("Sasan Kelishani");
    this._meta.addTag({ name: 'description', content: 'Hi , I am Sasan Kelishani , welcome to my blog . I post about Newest Teches , Making Games , AI and Web Development related subjects .' });
    this._meta.addTag({ name: 'author', content: 'Sasan Kelishani' });
    this._meta.addTag({ name: 'keywords', content: 'programming,web,javascript,teches,design,html,css,ai,blog,programming languages,fun projects' });

  }

  ngOnInit() {
    this._location.subscribe(event => {
      this._router.navigate(['/']).then(() => {
        // console.log(this.articlesComponent);
        const artilceHeader: Element = (<ElementRef>
          (<any>this.articlesComponent).articleHeader).nativeElement;
        artilceHeader.scrollIntoView(true);
        // this._document.documentElement.scrollIntoView({});
      });
    });
  }

}
