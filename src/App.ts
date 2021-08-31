import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import flash from 'node-twinkle';
import ExpressSession from 'express-session';

import { jeuRoutes } from './routes/JeuRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.expressApp.set('view engine', 'pug');
    this.expressApp.use(express.static(__dirname + '/public')); // https://expressjs.com/en/starter/static-files.html

  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(ExpressSession(
      { secret: 'My Secret Key',
        resave: false,
        saveUninitialized: true}));
    this.expressApp.use(flash); // https://www.npmjs.com/package/node-twinkle typed using https://stackoverflow.com/a/53786892/1168342 (solution #2)
  }

  // Configure API endpoints.
  private routes(): void {
    /* This function will change when we start to add more
     * API endpoints */
    let router = express.Router();

    // placeholder route handler
    router.get('/', (req, res, next) => {
      let messages = res.locals.has_flashed_messages() ? res.locals.get_flashed_messages() : [];
      res.render('index', { title: 'Jeu de dés', flashedMessages: messages, joueurs: jeuRoutes.jeu.getJoueurs()});
    });

    this.expressApp.use('/', router);  // routage de base

    this.expressApp.use('/api/v1/jeu', jeuRoutes.router);  // tous les URI pour le scénario jeu (DSS) commencent ainsi
  }

}

export default new App().expressApp;
