import { NextFunction, Request, Response } from 'express';
import ArtistsService from '@services/artists.service'

class ArtistsController {
  public artistsService : ArtistsService;
  
  constructor(artistsService: ArtistsService) {
    this.artistsService = artistsService;
  }
  
  public listAll = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.debug('list all');
    return this.artistsService.list().then((all) =>
    {
      res.status(200).json( all );
      next();
    }).catch(next);
    
  };
  
  
  public postData = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.debug('posting new data');
    return this.artistsService.load(req.body).then((all) => 
      {  
        res.status(201).json( all );
        next();
      }).catch(next);
  };
  
  public listOne = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.debug('list one' + req.params.id);
    return this.artistsService.getById(req.params.id).then((all) => 
    {  
      res.status(200).json( all );
    }).catch(next);
  }
  
  public createArtist = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return this.artistsService.createArtist().then((id) => {
      res.status(201).json( id );
    }).catch(next)
  }
  
  public updateArtist = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return this.artistsService.update(req.params.id, req.body).then((id) => {
      res.status(200).json( id );
    }).catch(next)
  }

  public dropOne = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return this.artistsService.dropOne(req.params.id).then((num) => {
      res.status(200).json( num );
    }).catch(next)
  }
}

export default ArtistsController;