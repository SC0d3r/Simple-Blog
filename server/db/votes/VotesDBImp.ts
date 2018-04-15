import { VotesDB, IpVoteMap } from './VotesDB';
import { resolve } from 'path';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
// console.log(process.cwd());
const adapter = new FileSync(resolve(process.cwd(), 'server', 'db', 'votes', './db.json'));
export class VotesDBImp implements VotesDB {
  private _db: any;
  constructor() {
    this._db = low(adapter);
    // Set some defaults
    this._db.defaults({ votes: {} })
      .write();

  }
  saveVote(articleID: string, ip: string, vote: "like" | "dislike"): Promise<boolean> {
    const voteObj = {};
    voteObj[ip] = vote;
    const articleIDVoteMap = {};
    articleIDVoteMap[articleID] = voteObj;

    const hasAlreadyVoted = this._db.get('votes').has(articleID).value();
    if (hasAlreadyVoted) return Promise.resolve(false);
    this._db.get('votes')
      .merge(articleIDVoteMap)
      .write();
    return Promise.resolve(true);
  }
  getVotes(articleID: string): Promise<IpVoteMap> {
    const articleIPVoteMap = this._db.get(`votes.${articleID}`)
      .value();
    return Promise.resolve(articleIPVoteMap);
  }
}