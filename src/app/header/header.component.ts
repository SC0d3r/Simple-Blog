import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

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
  isSmallScreen: boolean;
  isAboutMeOpen: boolean;
  isSubscribeOpen: boolean;
  isContactMeOpen: boolean;

  @ViewChild('avatar') private _avatar: ElementRef;
  @ViewChild('writerName') private _writerName: ElementRef;
  @ViewChild('header') private _header: ElementRef;
  @ViewChild('aboutMe') private _aboutMeText: ElementRef;
  @ViewChild('seprator') private _seprator: ElementRef;
  @ViewChild('icon') private _icon: ElementRef;
  @ViewChild('bgImage') private _bgImage: ElementRef;
  @ViewChild('cancelTranstion') private _cancelTranstion: ElementRef;
  @ViewChild('email') private _email: ElementRef;
  @ViewChild('placeholder') private _placeholder: ElementRef;
  @ViewChild('subscribeButton') private _subscribeButton: ElementRef;
  @ViewChild('aboutMeButton') private _aboutMeButton: ElementRef;
  @ViewChild('contactMeButton') private _contactMeButton: ElementRef;
  @ViewChild('saveEmail') private _saveEmail: ElementRef;

  @ViewChild('contactMe_links_gmail') private _contactMe_links_gmail: ElementRef;
  @ViewChild('contactMe_links_telegram') private _contactMe_links_telegram: ElementRef;
  @ViewChild('contactMe_links_github') private _contactMe_links_github: ElementRef;
  @ViewChild('contact_info') private _contact_info: ElementRef;
  // @ViewChild('links') private _links : ElementRef;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(@Inject(DOCUMENT) private _document: Document,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.isAboutMeOpen = false;
    this.isContactMeOpen = false;
    this.isSubscribeOpen = false;
  }

  ngOnInit() {
    this._showOrRemoveLinks(window.outerWidth);
    const isAboutMeSelected =
      this._route.snapshot.queryParamMap.get('aboutMe');
    const isContactMeSelected =
      this._route.snapshot.queryParamMap.get('contactMe');
    const isHomePageSelected =
      this._route.snapshot.queryParamMap.get('homePage');

    if (isAboutMeSelected || isContactMeSelected || isHomePageSelected) {
      this._document.documentElement.scrollTo(0, 0);
      if (isAboutMeSelected)
        setTimeout(() => {
          this.openAboutMe();
        }, 0);
      if (isContactMeSelected)
        setTimeout(() => {
          this.openContactMe();
        }, 0);

      // this line if for clearing the query params from page url
      this._router.navigate(['.'], { relativeTo: this._route, queryParams: {} });
    }
    // console.log(isAboutMeSelected,isContactMeSelected);
  }
  openGmail() {
    this._document.location.href = 'https://plus.google.com/u/0/101021312938202667659';

  }
  openTelegram() {
    console.log('dsaf');
    this._document.location.href = 'http://telegram.me/sc0d3r';
  }
  openGithub() {
    this._document.location.href = 'https://github.com/SC0d3r';
  }
  onResize(e) {
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
  openSubscribe() {
    this.isSubscribeOpen = true;
    const avatarDiv: HTMLDivElement = this._avatar.nativeElement;
    const writerName: HTMLDivElement = this._writerName.nativeElement;
    const header: HTMLDivElement = this._header.nativeElement;
    const seprator: HTMLDivElement = this._seprator.nativeElement;
    const aboutMeButton: HTMLDivElement = this._aboutMeButton.nativeElement;
    const contactMeButton: HTMLDivElement = this._contactMeButton.nativeElement;
    const icon: HTMLDivElement = this._icon.nativeElement;
    const cancelTranstion: HTMLDivElement = this._cancelTranstion.nativeElement;
    const email: HTMLDivElement = this._email.nativeElement;
    const placeholder: HTMLDivElement = this._placeholder.nativeElement;
    const subscribeButton: HTMLDivElement = this._subscribeButton.nativeElement;
    const saveEmail: HTMLDivElement = this._saveEmail.nativeElement;

    aboutMeButton.classList.add('zero-opacity');
    contactMeButton.classList.add('zero-opacity');
    avatarDiv.classList.add('avatar-transition-left');
    writerName.classList.add('writerName-transition-left');
    header.classList.add('header-transition', 'header-bg-email-transition');
    seprator.classList.add('zero-opacity');
    // links.classList.add('zero-opacity');
    icon.classList.add('zero-opacity');
    cancelTranstion.classList.add('cancelTransition-transition');
    email.classList.add('email-transition');
    placeholder.classList.add('emial-placeholder-color-transition');
    subscribeButton.classList.add('subscribeBtn-transition');
    saveEmail.classList.add('save-email-transition');
  }

  openContactMe() {
    this.isContactMeOpen = true;
    const avatarDiv: HTMLDivElement = this._avatar.nativeElement;
    const writerName: HTMLDivElement = this._writerName.nativeElement;
    const header: HTMLDivElement = this._header.nativeElement;
    const seprator: HTMLDivElement = this._seprator.nativeElement;
    const aboutMeButton: HTMLDivElement = this._aboutMeButton.nativeElement;
    const contactMeButton: HTMLDivElement = this._contactMeButton.nativeElement;
    const subscribeButton: HTMLDivElement = this._subscribeButton.nativeElement;
    const icon: HTMLDivElement = this._icon.nativeElement;
    const cancelTranstion: HTMLDivElement = this._cancelTranstion.nativeElement;
    const contactMe_links_gmail: HTMLDivElement = this._contactMe_links_gmail.nativeElement;
    const contactMe_links_telegram: HTMLDivElement = this._contactMe_links_telegram.nativeElement;
    const contactMe_links_github: HTMLDivElement = this._contactMe_links_github.nativeElement;
    const contact_info: HTMLDivElement = this._contact_info.nativeElement;

    avatarDiv.classList.add('avatar-transition-left');
    writerName.classList.add('writerName-transition-left');
    header.classList.add('header-transition', 'header-bg-contactMe-transition');
    seprator.classList.add('zero-opacity');
    icon.classList.add('zero-opacity');
    aboutMeButton.classList.add('zero-opacity');
    contactMeButton.classList.add('contactMeBtn-transition');
    subscribeButton.classList.add('zero-opacity');
    cancelTranstion.classList.add('contactMeBtn-backBtn-transition');

    contactMe_links_gmail.classList.add('contactMe-links-transition');
    setTimeout(() => {
      contactMe_links_telegram.classList.add('contactMe-links-transition');
    }, 500);
    setTimeout(() => {
      contactMe_links_github.classList.add('contactMe-links-transition');
    }, 1000);

    setTimeout(() => {
      contact_info.classList.add('contact-info-transition');
    }, 2000);
  }

  openAboutMe() {
    this.isAboutMeOpen = true;
    const avatarDiv: HTMLDivElement = this._avatar.nativeElement;
    const writerName: HTMLDivElement = this._writerName.nativeElement;
    const header: HTMLDivElement = this._header.nativeElement;
    const aboutMeText: HTMLDivElement = this._aboutMeText.nativeElement;
    const seprator: HTMLDivElement = this._seprator.nativeElement;
    const aboutMeButton: HTMLDivElement = this._aboutMeButton.nativeElement;
    const contactMeButton: HTMLDivElement = this._contactMeButton.nativeElement;
    const subscribeButton: HTMLDivElement = this._subscribeButton.nativeElement;
    const icon: HTMLDivElement = this._icon.nativeElement;
    const bgImage: HTMLDivElement = this._bgImage.nativeElement;
    const cancelTranstion: HTMLDivElement = this._cancelTranstion.nativeElement;

    avatarDiv.classList.add('avatar-transition');
    writerName.classList.add('writerName-transition');
    header.classList.add('header-transition', 'header-bg-aboutMe-transition');
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

  cancelTransition() {
    const avatarDiv: HTMLDivElement = this._avatar.nativeElement;
    const writerName: HTMLDivElement = this._writerName.nativeElement;
    const header: HTMLDivElement = this._header.nativeElement;
    const aboutMeText: HTMLDivElement = this._aboutMeText.nativeElement;
    const seprator: HTMLDivElement = this._seprator.nativeElement;
    const aboutMeButton: HTMLDivElement = this._aboutMeButton.nativeElement;
    const contactMeButton: HTMLDivElement = this._contactMeButton.nativeElement;
    const subscribeButton: HTMLDivElement = this._subscribeButton.nativeElement;
    const icon: HTMLDivElement = this._icon.nativeElement;
    const bgImage: HTMLDivElement = this._bgImage.nativeElement;
    const cancelTranstion: HTMLDivElement = this._cancelTranstion.nativeElement;
    const email: HTMLDivElement = this._email.nativeElement;
    const placeholder: HTMLDivElement = this._placeholder.nativeElement;
    const saveEmail: HTMLDivElement = this._saveEmail.nativeElement;

    const contactMe_links_gmail: HTMLDivElement = this._contactMe_links_gmail.nativeElement;
    const contactMe_links_telegram: HTMLDivElement = this._contactMe_links_telegram.nativeElement;
    const contactMe_links_github: HTMLDivElement = this._contactMe_links_github.nativeElement;
    const contact_info: HTMLDivElement = this._contact_info.nativeElement;


    header.classList.remove('header-transition');
    seprator.classList.remove('zero-opacity');
    icon.classList.remove('zero-opacity');

    cancelTranstion.classList.remove('cancelTransition-transition');
    if (this.isAboutMeOpen) {
      this.isAboutMeOpen = false;
      avatarDiv.classList.remove('avatar-transition');
      writerName.classList.remove('writerName-transition');
      aboutMeText.classList.remove('aboutMeText-transition');
      header.classList.remove('header-bg-aboutMe-transition');
      bgImage.classList.remove('bgImage-transition');
      aboutMeButton.classList.remove('zero-opacity');
      contactMeButton.classList.remove('zero-opacity');
      subscribeButton.classList.remove('zero-opacity');
    } else if (this.isSubscribeOpen) {
      this.isSubscribeOpen = false;
      placeholder.classList.remove('emial-placeholder-color-transition');
      avatarDiv.classList.remove('avatar-transition-left');
      writerName.classList.remove('writerName-transition-left');
      subscribeButton.classList.remove('subscribeBtn-transition');
      header.classList.remove('header-bg-email-transition');
      email.classList.remove('email-transition');
      aboutMeButton.classList.remove('zero-opacity');
      contactMeButton.classList.remove('zero-opacity');
      saveEmail.classList.remove('save-email-transition');

      cancelTranstion.classList.add('cancelTransition-email-transition');
      saveEmail.classList.add('cancelTransition-email-transition');
      setTimeout(() => {
        cancelTranstion.classList.remove('cancelTransition-email-transition');
        saveEmail.classList.remove('cancelTransition-email-transition');
      }, 1500);
    } else if (this.isContactMeOpen) {
      this.isContactMeOpen = false;

      avatarDiv.classList.remove('avatar-transition-left');
      writerName.classList.remove('writerName-transition-left');
      header.classList.remove('header-bg-contactMe-transition');
      aboutMeButton.classList.remove('zero-opacity');
      subscribeButton.classList.remove('zero-opacity');
      contactMeButton.classList.remove('contactMeBtn-transition');
      cancelTranstion.classList.remove('contactMeBtn-backBtn-transition');
      contact_info.classList.remove('contact-info-transition');
      setTimeout(() => {
        contactMe_links_gmail.classList.remove('contactMe-links-transition');
        contactMe_links_telegram.classList.remove('contactMe-links-transition');
        contactMe_links_github.classList.remove('contactMe-links-transition');
      }, 500);
    }

  }
}
