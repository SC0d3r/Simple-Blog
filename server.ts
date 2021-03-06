// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as morgan from 'morgan';
import * as session from 'express-session';
import bodyParser = require('body-parser');
import { join } from 'path';

const fileUpload = require('express-fileupload');
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

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

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { router } from './server/api/router';
import { router as authRouter } from './server/auth/router';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

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
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on ${hostName}`);
});