import { ViewsDB } from './ViewsDB';
import { resolve, join, basename } from 'path';
import { unlink } from 'fs';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(resolve(process.cwd(), 'db', 'views', './db.json'));

export class ViewsDBImp implements ViewsDB {

  
  private _db: any;
  constructor() {
    this._db = low(adapter);
    // Set some defaults
    this._db.defaults({ views: {} })
      .write();

  }
  increaseArticleView(articleID: string, clientIPAddr: string): Promise<number> {
    const ipHowManyVisitsMap = this._db.get(`views.${articleID}`).value();
    // if first time ipHowManyVisitsMap is undefined
    if (ipHowManyVisitsMap === undefined) {
      const newEntry = {};
      newEntry[articleID] = {};
      newEntry[articleID][clientIPAddr] = 1;
      this._db.get('views').assign(newEntry).write();
      return Promise.resolve(1);
    }
    const numberOfVisits = ipHowManyVisitsMap[clientIPAddr] || 0;
    ipHowManyVisitsMap[clientIPAddr] = numberOfVisits + 1;
    this._db.get(`views.${articleID}`).merge(ipHowManyVisitsMap).write();

    return Promise.resolve(Object.keys(ipHowManyVisitsMap).length);
  }
  getArticleViews(articleID: string): Promise<number> {
    const clientVisitedIPs: string[] = this._db.get(`views.${articleID}`).keys().value();// client_ip -> howMany times visited
    // Unique means each ip counts as one visits
    const howManyUniqueVisits = clientVisitedIPs.length;
    return Promise.resolve(howManyUniqueVisits);
  }
  delArticleViews(articleID: string): Promise<boolean> {
    const isDeleted = this._db.get('views')
      .unset(articleID).write();
    return Promise.resolve(isDeleted);
  }
}