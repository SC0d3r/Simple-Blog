import { ArticlesInfoService } from './../services/articles-info.service';
import { Article } from './../services/Article';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title: string = '';
  shortDescription: string = '';
  body: string = '';
  tags: string = '';
  @ViewChild('file') private _file: ElementRef;

  constructor(private _articleInfo: ArticlesInfoService) {
  }

  ngOnInit() {
    // TODO : editin article
  }
  onPost() {
    const fileElement: HTMLInputElement = this._file.nativeElement;
    const imageFile = fileElement.files[0];
    // console.log(imageFile);

    if (imageFile === undefined || fileSizeExceeds1MG(imageFile.size)) {
      console.log('select an image or file exceeds the 1mg limit');
      return;
    }

    if (notValid(this.body) ||
      notValid(this.title) ||
      notValid(this.tags) ||
      notValid(this.shortDescription)) {
      return;
    }

    // TODO : Sanitize image file name
    const newArticle = createArticle(
      imageFile.name,
      this.title,
      this.shortDescription,
      this.body,
      this.tags);

    this._articleInfo.saveArticle(newArticle);
    this._articleInfo.uploadImage(imageFile);
    this._reset();
  }
  private _reset() {
    this.title = '';
    this.shortDescription = '';
    this.body = '';
    this.tags = '';
  }

  openSelectImage(){
    const fileElement: HTMLInputElement = this._file.nativeElement;
    fileElement.click();
  }

  onUpload() {
    const fileElement: HTMLInputElement = this._file.nativeElement;
    const imageFile = fileElement.files[0];
    if (imageFile === undefined || fileSizeExceeds1MG(imageFile.size)) {
      console.log('select an image or file exceeds the 1mg limit');
      return;
    }

    this._articleInfo.uploadImage(imageFile);

    //reseting the upload file input
    fileElement.value = ''; 
  }
  onPreview() {
    //TODO : show how the article looks in the blog
  }
}

function notValid(x: string) {
  return typeof x !== 'string' || x.length === 0;
}
function createArticle(img, title, shortDesc, body, tags) {
  const article: Article = {
    id: guid(),
    img: {
      src: img,
      alt: 'Image for article'
    },
    title,
    shortDescription: shortDesc,
    body,
    tags,
    date: Date.now()
  }
  return article;
}

function guid() {
  return Math.random().toString(36).substring(2)
    + (new Date()).getTime().toString(36);
}

function fileSizeExceeds1MG(size: number) {
  size /= 1000;//turn into kb
  size /= 1000;//turn into mg
  return size > 1;
}