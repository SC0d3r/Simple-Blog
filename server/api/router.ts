import { SubscriptionImp } from './../db/subscription/SubscriptionImp';
import { Subscription } from './../db/subscription/Subscription';
import { ViewsDB } from './../db/views/ViewsDB';
import { ArticlesDBImp } from './../db/articles/ArticlesDBImp';
import { Router } from 'express';
import { VotesDB } from '../db/votes/VotesDB';
import { VotesDBImp } from '../db/votes/VotesDBImp';
import { ArticlesDB } from '../db/articles/ArticlesDB';
import { resolve } from 'path';
import { ViewsDBImp } from '../db/views/ViewsDBImp';
import * as cors from 'cors';

export const router = Router();


const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

const corsOptions = {
  origin: hostName,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(cors(corsOptions));

const votesDB: VotesDB = new VotesDBImp();
const articlesDB: ArticlesDB = new ArticlesDBImp();
const viewsDB: ViewsDB = new ViewsDBImp();
const subscriptionDB : Subscription = new SubscriptionImp();

router.post('/subscription' , (req,res) => {
  const email = req.body.email;
  subscriptionDB.saveEmail(email).then(isOk => {
    res.json({subscription : isOk});
  });
});
router.post('/votes/checkIP', (req, res) => {
  const ip = req.ip;

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
  const ip = req.ip;
  const { articleID, vote } = req.body;
  // console.log(`saving vote ${vote} for article ${articleID} and ip ${ip}`);
  //TODO : sanitizing
  votesDB.saveVote(articleID, <string>ip, vote);
});
router.post('/votes/delVotes', (req, res) => {
  if (!req.session.isAdmin) {
    return res.json({ isDeleted: false });
  }
  const articleID = req.body.articleID;
  votesDB.delVotes(articleID).then(isOk => {
    res.json({ isDeleted: isOk });
  });
});
router.post('/articles/save', (req, res) => {
  // console.log(req.session.isAdmin);
  if (!req.session.isAdmin) {
    return res.json({ isSaved: false });
  }
  const article = req.body.article;
  if (!article) return res.json({ isSaved: false });
  articlesDB.saveArticle(article);
  res.json({ isSaved: true });
});

router.post('/articles/delete', (req, res) => {
  if (!req.session.isAdmin) {
    return res.json({ isDeleted: false });
  }
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
router.get('/articles/id/:id', (req, res) => {
  const id: string = req.params.id;
  articlesDB.fetchByID(id).then(article => {
    res.json({ article, found: true });
  }).catch(err => {
    res.json({ found: false });
  })
});
router.get('/articles/tag/:tagName', (req, res) => {
  const tagName: string = req.params.tagName;
  articlesDB.fetchByTag(tagName).then(articles => {
    res.json(articles);
  });
});

router.post('/articles/image', (req, res) => {
  if (!req.session.isAdmin) {
    return res.json({ upload: 'Failed' });
  }
  // console.log('from router');
  // console.log((<any>req).files);
  if (!(<any>req).files)
    return res.status(400).send('No files were uploaded.');

  const articleImage = (<any>req).files.articleImage;
  const imageName = req.body.imageName;
  // console.log(`from server name of the image ${imageName}`);
  const imageSavePath = resolve(process.cwd(),
    'dist', 'browser', 'assets', 'images', 'uploads', imageName);
  // console.log(imageSavePath);
  articleImage.mv(imageSavePath, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ upload: 'Successful' });
  });
});


router.get('/article/veiws/:id', (req, res) => {
  const articleID: string = req.params.id;
  viewsDB.getArticleViews(articleID).then(visits => {
    res.json({ visits });
  });
});
router.post('/article/veiws', (req, res) => {
  const articleID: string = req.body.articleID;
  const ip = req.ip;
  viewsDB.increaseArticleView(articleID, ip).then(visits => {
    res.json({ visits });
  });
});
router.post('/article/veiws/delete', (req, res) => {
  if (!req.session.isAdmin) {
    return res.json({ isDeleted: false });
  }
  const articleID: string = req.body.articleID;
  viewsDB.delArticleViews(articleID).then(isDeleted => {
    res.json({ isDeleted });
  });
});

router.get('*', (req, res) => {
  res.redirect(hostName);
});