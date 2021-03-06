import { Article } from './../../../src/app/services/Article';
export interface ArticlesDB {
  saveArticle(article: Article);
  delArticle(articleID: string): Promise<boolean>;
  fetchArticles(howMany: number): Promise<Article[]>;
  fetchByID(id: string): Promise<Article>;
  fetchByTag(tagName: string): Promise<Article[]>;
}