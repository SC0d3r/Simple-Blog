import { ArticlesDB } from './ArticlesDB';
import { Article } from '../../../src/app/services/Article';
import { resolve, join, basename } from 'path';
import { unlink } from 'fs';
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
    const res: [Article] | void[] = this._db.get('articles')
      .remove({ id: articleID })
      .write();
    if (res.length === 0) return Promise.resolve(false);

    const removedArticle = <Article>res[0];
    const removablePictures = [removedArticle.img.src]
      .concat(removedArticle.innerBodyImages);

    const uploadsDir = resolve(
      process.cwd(), 'dist',
      'browser', 'assets',
      'images', 'uploads');

    removablePictures.forEach(imageName => {
      const imagePath = join(uploadsDir, basename(imageName));
      unlink(imagePath, function (err) {
        if (err) return console.log(err);
        console.log(`image ${basename(imageName)} deleted successfully!`);
      });
    });

    return Promise.resolve(true);
  }

  fetchArticles(howMany: number = -1): Promise<Article[]> {
    if (howMany === -1) {
      // means all the articles
      return Promise.resolve(this._db.get('articles').value());
    } else {
      return Promise.resolve(this._db.get('articles').take(howMany).value());
    }
  }

  fetchByID(id: string): Promise<Article> {
    const article = this._db.get('articles')
      .find({ id }).value();
    if (article) return Promise.resolve(article);
    return Promise.reject(`Article not found with ID [${id}]`);
  }
  fetchByTag(tagName: string): Promise<Article[]> {
    const articles = this._db.get('articles')
      .filter(art => art.tags.some(_tag => _tag === tagName)).value();
    return Promise.resolve(articles || []);
  }
}