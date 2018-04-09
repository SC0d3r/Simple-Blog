import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSmallScreen : boolean;
  isAboutMeOpen : boolean;
  isSubscribeOpen : boolean;
  isContactMeOpen : boolean;

  @ViewChild('avatar') private _avatar : ElementRef;
  @ViewChild('writerName') private _writerName : ElementRef;
  @ViewChild('header') private _header : ElementRef;
  @ViewChild('aboutMe') private _aboutMeText : ElementRef;
  @ViewChild('seprator') private _seprator : ElementRef;
  @ViewChild('icon') private _icon : ElementRef;
  @ViewChild('bgImage') private _bgImage : ElementRef;
  @ViewChild('cancelTranstion') private _cancelTranstion : ElementRef;
  @ViewChild('email') private _email : ElementRef;
  @ViewChild('placeholder') private _placeholder : ElementRef;
  @ViewChild('subscribeButton') private _subscribeButton : ElementRef;
  @ViewChild('aboutMeButton') private _aboutMeButton : ElementRef;
  @ViewChild('contactMeButton') private _contactMeButton : ElementRef;
  // @ViewChild('links') private _links : ElementRef;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  
  constructor() { 
    this.isAboutMeOpen = false;
    this.isContactMeOpen = false;
    this.isSubscribeOpen = false;
  }

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
  openSubscribe(){
    this.isSubscribeOpen = true;
    const avatarDiv : HTMLDivElement= this._avatar.nativeElement;
    const writerName : HTMLDivElement= this._writerName.nativeElement;
    const header : HTMLDivElement= this._header.nativeElement;
    const seprator : HTMLDivElement= this._seprator.nativeElement;
    const aboutMeButton : HTMLDivElement= this._aboutMeButton.nativeElement;
    const contactMeButton : HTMLDivElement= this._contactMeButton.nativeElement;
    const icon : HTMLDivElement= this._icon.nativeElement;
    const cancelTranstion : HTMLDivElement= this._cancelTranstion.nativeElement;
    const email : HTMLDivElement= this._email.nativeElement;
    const placeholder : HTMLDivElement= this._placeholder.nativeElement;
    const subscribeButton : HTMLDivElement= this._subscribeButton.nativeElement;
    
    aboutMeButton.classList.add('zero-opacity');
    contactMeButton.classList.add('zero-opacity');
    avatarDiv.classList.add('avatar-transition-left');
    writerName.classList.add('writerName-transition-left');
    header.classList.add('header-transition','header-bg-email-transition');
    seprator.classList.add('zero-opacity');
    // links.classList.add('zero-opacity');
    icon.classList.add('zero-opacity');
    cancelTranstion.classList.add('cancelTransition-transition');
    email.classList.add('email-transition');
    placeholder.classList.add('emial-placeholder-color-transition');
    subscribeButton.classList.add('subscribeBtn-transition');
  }
  
  openAboutMe(){
    this.isAboutMeOpen = true;
    const avatarDiv : HTMLDivElement= this._avatar.nativeElement;
    const writerName : HTMLDivElement= this._writerName.nativeElement;
    const header : HTMLDivElement= this._header.nativeElement;
    const aboutMeText : HTMLDivElement= this._aboutMeText.nativeElement;
    const seprator : HTMLDivElement= this._seprator.nativeElement;
    const aboutMeButton : HTMLDivElement= this._aboutMeButton.nativeElement;
    const contactMeButton : HTMLDivElement= this._contactMeButton.nativeElement;
    const subscribeButton : HTMLDivElement= this._subscribeButton.nativeElement;
    const icon : HTMLDivElement= this._icon.nativeElement;
    const bgImage : HTMLDivElement= this._bgImage.nativeElement;
    const cancelTranstion : HTMLDivElement= this._cancelTranstion.nativeElement;
    
    avatarDiv.classList.add('avatar-transition');
    writerName.classList.add('writerName-transition');
    header.classList.add('header-transition','header-bg-aboutMe-transition');
    aboutMeText.classList.add('aboutMeText-transition');
    seprator.classList.add('zero-opacity');
    aboutMeButton.classList.add('zero-opacity');
    contactMeButton.classList.add('zero-opacity');
    subscribeButton.classList.add('zero-opacity');
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
    const aboutMeButton : HTMLDivElement= this._aboutMeButton.nativeElement;
    const contactMeButton : HTMLDivElement= this._contactMeButton.nativeElement;
    const subscribeButton : HTMLDivElement= this._subscribeButton.nativeElement;
    const icon : HTMLDivElement= this._icon.nativeElement;
    const bgImage : HTMLDivElement= this._bgImage.nativeElement;
    const cancelTranstion : HTMLDivElement= this._cancelTranstion.nativeElement;
    const email : HTMLDivElement= this._email.nativeElement;
    const placeholder : HTMLDivElement= this._placeholder.nativeElement;
    
    
    header.classList.remove('header-transition');
    seprator.classList.remove('zero-opacity');
    icon.classList.remove('zero-opacity');
    
    cancelTranstion.classList.remove('cancelTransition-transition');
    if(this.isAboutMeOpen){
      this.isAboutMeOpen = false;
      avatarDiv.classList.remove('avatar-transition');
      writerName.classList.remove('writerName-transition');
      aboutMeText.classList.remove('aboutMeText-transition');
      header.classList.remove('header-bg-aboutMe-transition');
      bgImage.classList.remove('bgImage-transition');
      aboutMeButton.classList.remove('zero-opacity');
      contactMeButton.classList.remove('zero-opacity');
      subscribeButton.classList.remove('zero-opacity');
    }else if(this.isSubscribeOpen){
      this.isSubscribeOpen = false;
      placeholder.classList.remove('emial-placeholder-color-transition');
      avatarDiv.classList.remove('avatar-transition-left');
      subscribeButton.classList.remove('subscribeBtn-transition');
      writerName.classList.remove('writerName-transition-left');
      header.classList.remove('header-bg-email-transition');
      email.classList.remove('email-transition');
      aboutMeButton.classList.remove('zero-opacity');
      contactMeButton.classList.remove('zero-opacity');
      cancelTranstion.classList.add('cancelTransition-email-transition');
      cancelTranstion.classList.add('cancelTransition-email-transition');
      setTimeout(()=>{
        cancelTranstion.classList.remove('cancelTransition-email-transition');
      },1500);
    }

  }
}
