import { NextFunction, Request, Response } from 'express';
import ArtistsService from '@services/artists.service'

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
      this.artistsService.load(req.body).then((all) => 
        {  
          res.status(201).json( all );
          next();
        });
      } catch (error) {
        next(error);
      }
    };
    
    public listOne = (req: Request, res: Response, next: NextFunction): Promise<void> => {
      
      console.log('list one' + req.params.id);
      return this.artistsService.getById(req.params.id).then((all) => 
      {  
        res.status(200).json( all );
      }).catch(next);
    }
    
    public createArtist = (req: Request, res: Response, next: NextFunction): Promise<void> =>{
      console.log('create one');
      return this.artistsService.createArtist().then((id) => {
        res.status(200).json( id );
      }).catch(next)
    }
    
    public updateArtist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      console.log('update one');
      return this.artistsService.update(req.params.id, req.body).then((id) => {
        res.status(200).json( id );
      }).catch(next)
    }
  }
  
  
  export default ArtistsController;