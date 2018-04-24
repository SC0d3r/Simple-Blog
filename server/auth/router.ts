import { Router } from "express";
import * as request from 'request';

export const router = Router();
const userAuth = require('./admin-user.json');
const { authHash , googleCaptchaSecret } = userAuth;

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

// add guard for spamming password 
// give three min delay after 3 attempts
router.post('/', (req, res) => {
  if(!req.session.isCaptchaSuccessful){
    return res.json({ authenticated: false });
  }
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
    secret: googleCaptchaSecret,
    response: captchaResponse,
    remoteip: req.ip
  };
  // make a post request
  const options = {
    url: googleCapthchURL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    form: data
  };
  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
    }
    const isPassed = JSON.parse(response.body).success;
    req.session.isCaptchaSuccessful = isPassed;
    res.json({isPassed});
  });
});
router.get('*', (req, res) => {
  res.redirect(hostName);
});
