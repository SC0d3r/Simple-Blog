import { Router } from 'express';

export const router = Router();

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

// router.post('/votes', (req, res) => {
  
  
// });
router.post('/votes/checkIP', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(req.body);
  console.log(`ip address of client is ${ip}`);
  
  //TODO : read vote from database
  res.json({voted : true});
});
router.post('/votes/saveVote', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //save vote to database
});

router.get('*' , (req ,res) => {
  res.redirect(hostName);
});

