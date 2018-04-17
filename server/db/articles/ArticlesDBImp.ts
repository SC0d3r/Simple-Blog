import { ArticlesDB } from './ArticlesDB';
import { Article } from '../../../src/app/services/Article';
import { resolve } from 'path';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(resolve(process.cwd(), 'server', 'db', 'articles', './db.json'));

export class ArticlesDBImp implements ArticlesDB {
  
  private _db: any;
  constructor() {
    this._db = low(adapter);
    // Set some defaults
    this._db.defaults({ articles: [] })
      .write();

  }
  saveArticle(article: Article) {
    //TODO : sanitizing
    this._db.get('articles').push(article).write();
  }
  
  delArticle(articleID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  fetchArticles(howMany: number = -1): Promise<Article[]> {
    if (howMany === -1) {
      // means all the articles
      return Promise.resolve(this._db.get('articles').value());
    } else {
      return Promise.resolve(this._db.get('articles').take(howMany).value());
    }
  }
}