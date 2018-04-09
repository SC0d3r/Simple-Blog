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
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { ArticleLeftSideComponent } from './article-left-side/article-left-side.component';
import { ArticleRightSideComponent } from './article-right-side/article-right-side.component';
import { HomePageComponent } from './home-page/home-page.component';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';

import { ArticlesInfoService } from './services/articles-info.service';

import { DisqusModule } from "ngx-disqus";
import { MarkdownModule } from 'angular2-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FixedBoardComponent,
    InsightsComponent,
    ArticlesComponent,
    FooterComponent,
    TopFooterComponent,
    ArticleComponent,
    ArticleLeftSideComponent,
    ArticleRightSideComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'sasan-kelishani' }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,

    MarkdownModule.forRoot(),
    DisqusModule.forRoot('sasan-kelishani'),

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatProgressBarModule
  ],
  providers: [ArticlesInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
