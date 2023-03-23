import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, MONGO_URL, MONGO_SECRET, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import MongoArtistDatabase from './services/mongoartistdatabase.service'
import ArtistsController from './controllers/artists.controller';
import ArtistService from './services/artists.service';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private artistDatabase: MongoArtistDatabase
  private artistController: ArtistsController;
  private artistService: ArtistService

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.artistDatabase = new MongoArtistDatabase(MONGO_URL, MONGO_SECRET);
    this.artistService = new ArtistService(this.artistDatabase);
    this.artistController = new ArtistsController(this.artistService);

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.artistDatabase.connect().then(() => {
      this.app.listen(this.port, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`🚀 App listening on the port ${this.port}`);
        logger.info(`=================================`);
      })}).catch((e) => {
        console.log("myerror ", e)
      });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());        // Query parameter sanitation
    this.app.use(helmet());     // Setting some security-related headers
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.get('/artists', this.artistController.listAll);
    this.app.get('/artists/:id', this.artistController.listOne);
    this.app.get('/artists/:id', this.artistController.listOne);
    this.app.post('/artists', this.artistController.createArtist);
    this.app.put('/artists/:id', this.artistController.updateArtist)

    // this.app.get(``, this.usersController.getUserById);
    this.app.post(`/postData`, this.artistController.postData);
    // this.app.put(`/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
