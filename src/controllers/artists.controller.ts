import { NextFunction, Request, Response } from 'express';
import ArtistsService from '@services/artists.service'

class ArtistsController {
  public artistsService : ArtistsService;

  constructor(artistsService: ArtistsService) {
    this.artistsService = artistsService;
  }

  public listAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('trying to list all');
      const all = await this.artistsService.list();
      res.status(201).json( all );
    } catch (error) {
      next(error);
    }
  };
}

export default ArtistsController;