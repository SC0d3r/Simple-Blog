import { AuthService } from './../services/auth/auth.service';
import { ArticlesInfoService } from './../services/articles-info.service';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Article } from '../services/Article';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  isUserAdmin: boolean;
  @ViewChild('ArticlesHeader') public articleHeader: ElementRef;
  constructor(private _router: Router,
    private _articlesInfo: ArticlesInfoService,
    private _auth: AuthService,
    public dialog: MatDialog) {
    this._articlesInfo.fetchArticles()
      .subscribe(arts => this.articles = arts);
    this.isUserAdmin = false;
  }

  ngOnInit() {
    this.isUserAdmin = this._auth.isLoggedIn;
  }

  selectArticle(articleID: string) {
    const params: NavigationExtras = {
      // skipLocationChange : true,
      queryParams: {
        selected: true
      }
    }
    this._router.navigate(['/article', articleID], params);
  }


  openSettings(articleID: string, event: Event) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(ArticlesAdminSettingsDialog, {
      width: '250px',
      data: { articleID }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
}



@Component({
  selector: 'articles-admin-settings-dialog',
  templateUrl: 'articles-admin-settings-dialog.html',
})
export class ArticlesAdminSettingsDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ArticlesAdminSettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(`article id is ${this.data.articleID}`);
  }

  onDelete(){
    // TODO : implement deleting the article from site and db
  }
  onEdit(){
    // TODO : implement editing the article in site and db
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}