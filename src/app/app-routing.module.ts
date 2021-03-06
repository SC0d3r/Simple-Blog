import { TagsComponent } from './tags/tags.component';
import { AuthGuardService } from './services/route-guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticleComponent } from './article/article.component';
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from '@angular/router';

const routes : Routes = [
  {path:'' ,pathMatch : 'full',component : HomePageComponent},
  {path : 'article/:id' , component : ArticleComponent},
  {path : 'login' , component : LoginComponent},
  {path : 'tags/:tagName' , component : TagsComponent},
  {path : 'admin' , canActivate : [AuthGuardService] ,component : AdminComponent},
  {path : 'notSupported' , component : NotSupportedComponent},
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
