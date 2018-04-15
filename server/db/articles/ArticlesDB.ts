import { Article } from './../../../src/app/services/Article';
export interface ArticlesDB {
  saveArticle(article : Article);
  fetchArticles(howMany : number) : Promise<Article[]>;
}