import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopFooterComponent } from './top-footer/top-footer.component';
import { InsightsComponent } from './insights/insights.component';
import { FixedBoardComponent } from './fixed-board/fixed-board.component';
import { ArticlesComponent, ArticlesAdminSettingsDialog } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { ArticleLeftSideComponent } from './article-left-side/article-left-side.component';
import { ArticleRightSideComponent } from './article-right-side/article-right-side.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ArticlesInfoService } from './services/articles-info.service';

import { DisqusModule } from "ngx-disqus";
import { MarkdownModule } from 'angular2-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from './services/db/database.service';
import { AuthGuardService } from './services/route-guards/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { MiddlePageAboutMeComponent } from './middle-page-about-me/middle-page-about-me.component';
import { InterestsComponent } from './interests/interests.component';
import { ViewsService } from './services/views/views.service';


import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { TagsComponent } from './tags/tags.component';
@NgModule({
  entryComponents : [
    ArticlesAdminSettingsDialog
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FixedBoardComponent,
    InsightsComponent,
    ArticlesAdminSettingsDialog,
    ArticlesComponent,
    FooterComponent,
    TopFooterComponent,
    ArticleComponent,
    ArticleLeftSideComponent,
    ArticleRightSideComponent,
    HomePageComponent,
    NotSupportedComponent,
    AdminComponent,
    LoginComponent,
    MiddlePageAboutMeComponent,
    InterestsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'sasan-kelishani' }),
    RecaptchaModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,

    MarkdownModule.forRoot(),
    DisqusModule.forRoot('sasan-kelishani'),

    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  providers: [ArticlesInfoService,DatabaseService, AuthGuardService, AuthService, ViewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
