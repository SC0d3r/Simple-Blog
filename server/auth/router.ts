import { Router } from "express";
import * as request from 'request';

export const router = Router();
const userAuth = require('./admin-user.json');
const { authHash } = userAuth;

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

// add guard for spamming password 
// give three min delay after 3 attempts
router.post('/', (req, res) => {
  const postedHash = req.body.usernamePasswordHash;
  if (postedHash === authHash) {
    req.session.isAdmin = true;
    return res.json({ authenticated: true });
  } else {
    req.session.isAdmin = false;
    return res.json({ authenticated: false });
  }
});
router.post('/captcha', (req, res) => {
  const googleCapthchURL = "https://www.google.com/recaptcha/api/siteverify";
  const captchaResponse = req.body.captchaResponse;
  const data = {
    secret: "6LcXGFUUAAAAAKskWhOIXCpx45lhch86XYw-UxVL",
    response: captchaResponse,
    remoteip: req.ip
  };
  // make a post request
  request({
    url: googleCapthchURL,
    method: "POST",
    json: true,   // <--Very important!!!
    body: data
  }, function (error, response, body) {
    if (error) {
      console.error(error);
    }
    console.log(response);
  });
});
router.get('*', (req, res) => {
  res.redirect(hostName);
});
