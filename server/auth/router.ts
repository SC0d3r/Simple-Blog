import { Router } from "express";

export const router = Router();
const userAuth = require('./admin-user.json');
const { authPwd, username } = userAuth;

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

router.get('/', (req, res) => {
  return res.json({ auth: authPwd });
});

router.get('*', (req, res) => {
  res.redirect(hostName);
});
