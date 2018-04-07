import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { AppRoutingModule } from './/app-routing.module';
import { ArticlesInfoService } from './services/articles-info.service';


import { MarkdownModule } from 'angular2-markdown';

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
    AppRoutingModule,
    NoopAnimationsModule,

    MarkdownModule.forRoot(),

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [ArticlesInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
