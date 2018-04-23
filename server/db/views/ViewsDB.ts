export interface ViewsDB {
  increaseArticleView(articleID : string,clientIPAddr : string) : Promise<number>;
  getArticleViews(articleID : string) : Promise<number>;
  delArticleViews(articleID : string) : Promise<boolean>;
} 