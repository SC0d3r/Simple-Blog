import { HomePageComponent } from './home-page/home-page.component';
import { ArticleComponent } from './article/article.component';
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from '@angular/router';

const routes : Routes = [
  {path:'' ,pathMatch : 'full',component : HomePageComponent},
  {path : 'article/:id' , component : ArticleComponent},
  {path : '**' , redirectTo : ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }