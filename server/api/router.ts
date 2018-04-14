import { VotesDBImp } from '../db/VotesDBImp';
import { Router } from 'express';

export const router = Router();

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

const votesDB = new VotesDBImp();

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

router.get('*', (req, res) => {
  res.redirect(hostName);
});


function getClientIPAddress(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0] 
      || req.connection.remoteAddress;
};
