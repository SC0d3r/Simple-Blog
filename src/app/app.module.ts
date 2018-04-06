import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopFooterComponent } from './top-footer/top-footer.component';
import { InsightsComponent } from './insights/insights.component';
import { ProjectsComponent } from './projects/projects.component';
import { FixedBoardComponent } from './fixed-board/fixed-board.component';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ArticleComponent } from './article/article.component';
import { ArticleLeftSideComponent } from './article-left-side/article-left-side.component';
import { ArticleRightSideComponent } from './article-right-side/article-right-side.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FixedBoardComponent,
    InsightsComponent,
    TopFooterComponent,
    ProjectsComponent,
    ArticleComponent,
    ArticleLeftSideComponent,
    ArticleRightSideComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
