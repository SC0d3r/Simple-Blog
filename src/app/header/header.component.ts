import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSmallScreen : boolean;
  @ViewChild('avatar') private _avatar : ElementRef;
  @ViewChild('writerName') private _writerName : ElementRef;
  @ViewChild('header') private _header : ElementRef;
  @ViewChild('aboutMe') private _aboutMeText : ElementRef;
  @ViewChild('seprator') private _seprator : ElementRef;
  @ViewChild('links') private _links : ElementRef;
  @ViewChild('icon') private _icon : ElementRef;
  @ViewChild('bgImage') private _bgImage : ElementRef;
  @ViewChild('cancelTranstion') private _cancelTranstion : ElementRef;

  constructor() { }

  ngOnInit() {
    this._showOrRemoveLinks(window.outerWidth);
  }
  onResize(e){
    const width = e.target.outerWidth;
    // console.log(width);
    this._showOrRemoveLinks(width);
  }
  
  private _showOrRemoveLinks(width: any) {
    if (width <= 800) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }
  
  
  openAboutMe(){
    const avatarDiv : HTMLDivElement= this._avatar.nativeElement;
    const writerName : HTMLDivElement= this._writerName.nativeElement;
    const header : HTMLDivElement= this._header.nativeElement;
    const aboutMeText : HTMLDivElement= this._aboutMeText.nativeElement;
    const seprator : HTMLDivElement= this._seprator.nativeElement;
    const links : HTMLDivElement= this._links.nativeElement;
    const icon : HTMLDivElement= this._icon.nativeElement;
    const bgImage : HTMLDivElement= this._bgImage.nativeElement;
    const cancelTranstion : HTMLDivElement= this._cancelTranstion.nativeElement;

    avatarDiv.classList.add('avatar-transition');
    writerName.classList.add('writerName-transition');
    header.classList.add('header-transition');
    aboutMeText.classList.add('aboutMeText-transition');
    seprator.classList.add('zero-opacity');
    links.classList.add('zero-opacity');
    icon.classList.add('zero-opacity');
    bgImage.classList.add('bgImage-transition');
    cancelTranstion.classList.add('cancelTransition-transition');
    // cancelTranstion
  }

  cancelTransition(){
    const avatarDiv : HTMLDivElement= this._avatar.nativeElement;
    const writerName : HTMLDivElement= this._writerName.nativeElement;
    const header : HTMLDivElement= this._header.nativeElement;
    const aboutMeText : HTMLDivElement= this._aboutMeText.nativeElement;
    const seprator : HTMLDivElement= this._seprator.nativeElement;
    const links : HTMLDivElement= this._links.nativeElement;
    const icon : HTMLDivElement= this._icon.nativeElement;
    const bgImage : HTMLDivElement= this._bgImage.nativeElement;
    const cancelTranstion : HTMLDivElement= this._cancelTranstion.nativeElement;

    avatarDiv.classList.remove('avatar-transition');
    writerName.classList.remove('writerName-transition');
    header.classList.remove('header-transition');
    aboutMeText.classList.remove('aboutMeText-transition');
    seprator.classList.remove('zero-opacity');
    links.classList.remove('zero-opacity');
    icon.classList.remove('zero-opacity');
    bgImage.classList.remove('bgImage-transition');
    cancelTranstion.classList.remove('cancelTransition-transition');
  }
}
