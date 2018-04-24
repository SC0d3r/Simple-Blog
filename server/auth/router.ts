import { Router } from "express";

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

router.get('*', (req, res) => {
  res.redirect(hostName);
});
