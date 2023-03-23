import { NextFunction, Request, Response } from 'express';
import ArtistsService from '@services/artists.service'
import ArtistsDTO from  '@dtos/artists.dto'

class ArtistsController {
  public artistsService : ArtistsService;

  constructor(artistsService: ArtistsService) {
    this.artistsService = artistsService;
  }

  public listAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('list all');
      const all = this.artistsService.list().then((all) =>
        {
          res.status(201).json( all );
          next();
        });
    } catch (error) {
      next(error);
    }
  };


  public postData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('posting new data');
      const artists: ArtistsDTO = req.body;
      this.artistsService.load(req.body).then((all) => 
        {  
          res.status(201).json( all );
          next();
        });
    } catch (error) {
      next(error);
    }
  };

  public listOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      console.log('list one' + req.params.id);
      this.artistsService.getById(req.params.id).then((all) => 
        {  
          res.status(200).json( all );
          next();
        });
    } catch (error) {
      next(error);
    }
  }
}

export default ArtistsController;