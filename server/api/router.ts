import { ArticlesDBImp } from './../db/articles/ArticlesDBImp';
import { Router } from 'express';
import { VotesDB } from '../db/votes/VotesDB';
import { VotesDBImp } from '../db/votes/VotesDBImp';
import { ArticlesDB } from '../db/articles/ArticlesDB';

export const router = Router();

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

const votesDB : VotesDB = new VotesDBImp();
const articlesDB : ArticlesDB = new ArticlesDBImp();

router.post('/votes/checkIP', (req, res) => {
  const ip = getClientIPAddress(req);

  // console.log(req.body);
  // console.log(`ip address of client is ${ip}`);

  const { articleID } = req.body;
  votesDB.getVotes(articleID).then(data => {
    // console.log('getting votes from db');
    if (data) {
      // console.log(data);
      if (data[<string>ip]) {
        return res.json({ voted: true });
      }
    }
    res.json({ voted: false });
  });
});

router.post('/votes/saveVote', (req, res) => {
  const ip = getClientIPAddress(req);
  const { articleID, vote } = req.body;
  // console.log(`saving vote ${vote} for article ${articleID} and ip ${ip}`);
  //TODO : sanitizing
  votesDB.saveVote(articleID, <string>ip, vote);
});

router.post('/articles/save', (req, res) => {
  const article = req.body.article;
  if(!article) return res.json({isSaved : false});
  articlesDB.saveArticle(article);
  res.json({isSaved : true});
});

router.get('/articles/:howMany', (req, res) => {
  const howMany = +req.params.howMany;
  articlesDB.fetchArticles(howMany).then(articles => {
    res.json(articles);
  });
});

router.get('*', (req, res) => {
  res.redirect(hostName);
});


function getClientIPAddress(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0] 
      || req.connection.remoteAddress;
};
