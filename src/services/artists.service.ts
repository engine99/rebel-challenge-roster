import { Artist } from '@interfaces/artists.interface'
import { resolve } from 'path';
import ArtistDatabase from './artistdatabase.service';

class ArtistService {
    db: ArtistDatabase;

    constructor(db: ArtistDatabase) {
        this.db = db;
    }

    public load(artists: Artist[]): Promise<Artist[]> {
        return this.db
        .drop()
            .then(() => {
                return this.db.create(artists).then();
            });
    }

    public async list(): Promise<Artist[]> {
        return this.db.list();
    }
}

export default ArtistService;