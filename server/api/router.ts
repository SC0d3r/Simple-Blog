import { ArticlesDBImp } from './../db/articles/ArticlesDBImp';
import { Router } from 'express';
import { VotesDB } from '../db/votes/VotesDB';
import { VotesDBImp } from '../db/votes/VotesDBImp';
import { ArticlesDB } from '../db/articles/ArticlesDB';
import { resolve } from 'path';

export const router = Router();

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

const votesDB: VotesDB = new VotesDBImp();
const articlesDB: ArticlesDB = new ArticlesDBImp();

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
  if (!article) return res.json({ isSaved: false });
  articlesDB.saveArticle(article);
  res.json({ isSaved: true });
});

router.post('/articles/delete', (req, res) => {
  const articleID = req.body.articleID;
  articlesDB.delArticle(articleID).then(isOk => {
    res.json({ isDeleted: isOk });
  });
});

router.get('/articles/:howMany', (req, res) => {
  const howMany = +req.params.howMany;
  articlesDB.fetchArticles(howMany).then(articles => {
    res.json(articles);
  });
});

router.post('/articles/image', (req, res) => {
  // console.log('from router');
  // console.log((<any>req).files);
  if (!(<any>req).files)
    return res.status(400).send('No files were uploaded.');

  const articleImage = (<any>req).files.articleImage;
  const imageName = req.body.imageName;
  // console.log(`from server name of the image ${imageName}`);
  const imageSavePath = resolve(process.cwd(),
    'dist','browser', 'assets', 'images', 'uploads', imageName);
  // console.log(imageSavePath);
  articleImage.mv(imageSavePath, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({upload : 'Successful'});
  });
});

router.get('*', (req, res) => {
  res.redirect(hostName);
});


function getClientIPAddress(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0]
    || req.connection.remoteAddress;
};
