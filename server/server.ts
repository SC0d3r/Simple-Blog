import * as express from 'express';
import * as morgan from 'morgan';
import * as session from 'express-session';
import bodyParser = require('body-parser');
import { join } from 'path';

const fileUpload = require('express-fileupload');

// Express server
const app = express();
app.use(morgan(':remote-addr :remote-user :method :url :status :res[content-length] [referrer] :referrer - :response-time ms'));
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'My Pashmi Pishik Is Awesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const PORT = process.env.PORT || 4000;
const hostName = process.env.host || `http://localhost:${PORT}`;

const DIST_FOLDER = join(process.cwd(), 'dist');

import { router } from './api/router';
import { router as authRouter } from './auth/router';

//app.set('view engine', 'html');
//app.set('views', join(DIST_FOLDER, 'browser'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(fileUpload());
// TODO: implement data requests securely
// res.status(404).send('data requests are not supported');
app.use('/api', router);
app.use('/auth',authRouter);
// Server static files from /browser
// app.get('/hello' , (req , res) => res.json({what : "awersome"}))
//app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));


// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on ${hostName}`);
});