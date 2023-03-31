import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, MONGO_URL, MONGO_SECRET, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
//import errorMiddleware from '@middlewares/error.middleware';
//import { logger, stream } from '@utils/logger';
import MongoArtistDatabase from './services/mongoartistdatabase.service';
import ArtistsController from './controllers/artists.controller';
import ArtistService from './services/artists.service';
import validationMiddleware from './middlewares/validation.middleware';
import CreateArtistDto from './dtos/artists.dto';
import { MongoClient } from 'mongodb';

class App {
  public expressApp: express.Application;
  public env: string;
  public port: string | number;
  private artistDatabase: MongoArtistDatabase;
  private artistController: ArtistsController;
  private artistService: ArtistService;

  constructor(mongoClient: MongoClient) {
    this.expressApp = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.artistDatabase = new MongoArtistDatabase(mongoClient.db(`ArtistRoster_${NODE_ENV}`));  // the artists db name
    this.artistService = new ArtistService(this.artistDatabase);
    this.artistController = new ArtistsController(this.artistService);

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {  
    this.expressApp.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    })
  }

  public getServer() {
    return this.expressApp;
  }

  private initializeMiddlewares() {
    //this.expressApp.use(morgan(LOG_FORMAT, { stream }));
    this.expressApp.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.expressApp.use(hpp()); // Query parameter sanitation
    this.expressApp.use(helmet()); // Setting some security-related headers
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.expressApp.get('/artists', this.artistController.listAll);
    this.expressApp.post('/artists', this.artistController.createArtist);
    this.expressApp.put('/artists/:id', validationMiddleware(CreateArtistDto, 'body', false), this.artistController.updateArtist);
    this.expressApp.get('/artists/:id', this.artistController.listOne);
    this.expressApp.delete('/artists/:id', this.artistController.dropOne);

    this.expressApp.post(`/postData`, this.artistController.postData);

    //this.expressApp.use(express.static('react-client/build'));
    // this.app.put(`/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
  }

  private initializeErrorHandling() {
    //this.expressApp.use(errorMiddleware);
  }
}

export default App;
